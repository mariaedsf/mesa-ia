import "server-only";

import { randomUUID } from "node:crypto";
import { and, asc, desc, eq } from "drizzle-orm";
import type {
  CustomerReviewRecord,
  MenuItemRecord,
  OrderRecord,
  Restaurant,
} from "../../domain/operational-records";
import type {
  NewCustomerReview,
  NewMenuItem,
  NewOrder,
  NewRestaurant,
  OperationalDataRepository,
} from "../../application/ports/operational-data-repository";
import { db } from "../database/client";
import {
  customerReviews,
  menuItems,
  operationalOrders,
  restaurants,
  workspaceSettings,
} from "../database/schema";

export class DrizzleOperationalDataRepository implements OperationalDataRepository {
  async getRestaurants(): Promise<Restaurant[]> {
    return db.select().from(restaurants).orderBy(asc(restaurants.name)).all();
  }

  async getRestaurant(id: string): Promise<Restaurant | null> {
    return (
      (await db.select().from(restaurants).where(eq(restaurants.id, id)).get()) ??
      null
    );
  }

  async createRestaurant(input: NewRestaurant): Promise<Restaurant> {
    const restaurant: Restaurant = {
      ...input,
      id: randomUUID(),
    };

    await db.insert(restaurants).values({ ...restaurant, createdAt: new Date() });
    return restaurant;
  }

  async getSelectedRestaurant(): Promise<Restaurant | null> {
    const settings = await db
      .select()
      .from(workspaceSettings)
      .where(eq(workspaceSettings.id, 1))
      .get();

    if (!settings) return null;
    return this.getRestaurant(settings.restaurant);
  }

  async selectRestaurant(id: string): Promise<void> {
    const restaurant = await this.getRestaurant(id);
    if (!restaurant) throw new Error("Restaurante não encontrado.");

    await db
      .insert(workspaceSettings)
      .values({ id: 1, restaurant: id })
      .onConflictDoUpdate({
        target: workspaceSettings.id,
        set: { restaurant: id },
      });
  }

  async getMenuItems(restaurantId: string): Promise<MenuItemRecord[]> {
    return db
      .select()
      .from(menuItems)
      .where(eq(menuItems.restaurantId, restaurantId))
      .orderBy(asc(menuItems.name))
      .all();
  }

  async createMenuItem(input: NewMenuItem): Promise<MenuItemRecord> {
    const item: MenuItemRecord = {
      ...input,
      id: randomUUID(),
      available: true,
    };

    await db.insert(menuItems).values({ ...item, createdAt: new Date() });
    return item;
  }

  async setMenuItemAvailability(
    id: string,
    restaurantId: string,
    available: boolean,
  ): Promise<void> {
    await db
      .update(menuItems)
      .set({ available })
      .where(and(eq(menuItems.id, id), eq(menuItems.restaurantId, restaurantId)));
  }

  async deleteMenuItem(id: string, restaurantId: string): Promise<void> {
    await db
      .update(operationalOrders)
      .set({ menuItemId: null })
      .where(
        and(
          eq(operationalOrders.menuItemId, id),
          eq(operationalOrders.restaurantId, restaurantId),
        ),
      );
    await db
      .delete(menuItems)
      .where(and(eq(menuItems.id, id), eq(menuItems.restaurantId, restaurantId)));
  }

  async getOrders(restaurantId: string): Promise<OrderRecord[]> {
    return db
      .select()
      .from(operationalOrders)
      .where(eq(operationalOrders.restaurantId, restaurantId))
      .orderBy(desc(operationalOrders.orderedAt))
      .all();
  }

  async createOrder(input: NewOrder): Promise<OrderRecord> {
    const order: OrderRecord = { ...input, id: randomUUID() };
    await db.insert(operationalOrders).values(order);
    return order;
  }

  async deleteOrder(id: string, restaurantId: string): Promise<void> {
    await db
      .delete(operationalOrders)
      .where(
        and(
          eq(operationalOrders.id, id),
          eq(operationalOrders.restaurantId, restaurantId),
        ),
      );
  }

  async getReviews(restaurantId: string): Promise<CustomerReviewRecord[]> {
    return db
      .select()
      .from(customerReviews)
      .where(eq(customerReviews.restaurantId, restaurantId))
      .orderBy(desc(customerReviews.receivedAt))
      .all();
  }

  async createReview(input: NewCustomerReview): Promise<CustomerReviewRecord> {
    const review: CustomerReviewRecord = {
      ...input,
      id: randomUUID(),
      answered: false,
    };
    await db.insert(customerReviews).values(review);
    return review;
  }

  async setReviewAnswered(
    id: string,
    restaurantId: string,
    answered: boolean,
  ): Promise<void> {
    await db
      .update(customerReviews)
      .set({ answered })
      .where(
        and(
          eq(customerReviews.id, id),
          eq(customerReviews.restaurantId, restaurantId),
        ),
      );
  }

  async deleteReview(id: string, restaurantId: string): Promise<void> {
    await db
      .delete(customerReviews)
      .where(
        and(
          eq(customerReviews.id, id),
          eq(customerReviews.restaurantId, restaurantId),
        ),
      );
  }
}
