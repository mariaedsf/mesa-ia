import type {
  CustomerReviewRecord,
  MenuItemRecord,
  OrderRecord,
  Restaurant,
} from "../../domain/operational-records";

export type NewRestaurant = Omit<Restaurant, "id">;
export type NewMenuItem = Omit<MenuItemRecord, "id" | "available">;
export type NewOrder = Omit<OrderRecord, "id">;
export type NewCustomerReview = Omit<CustomerReviewRecord, "id" | "answered">;

export interface OperationalDataRepository {
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | null>;
  createRestaurant(input: NewRestaurant): Promise<Restaurant>;
  getSelectedRestaurant(): Promise<Restaurant | null>;
  selectRestaurant(id: string): Promise<void>;
  getMenuItems(restaurantId: string): Promise<MenuItemRecord[]>;
  createMenuItem(input: NewMenuItem): Promise<MenuItemRecord>;
  setMenuItemAvailability(id: string, restaurantId: string, available: boolean): Promise<void>;
  deleteMenuItem(id: string, restaurantId: string): Promise<void>;
  getOrders(restaurantId: string): Promise<OrderRecord[]>;
  createOrder(input: NewOrder): Promise<OrderRecord>;
  deleteOrder(id: string, restaurantId: string): Promise<void>;
  getReviews(restaurantId: string): Promise<CustomerReviewRecord[]>;
  createReview(input: NewCustomerReview): Promise<CustomerReviewRecord>;
  setReviewAnswered(id: string, restaurantId: string, answered: boolean): Promise<void>;
  deleteReview(id: string, restaurantId: string): Promise<void>;
}
