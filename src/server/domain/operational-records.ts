export type Restaurant = {
  id: string;
  name: string;
  teamSize: number;
  stations: number;
  teamExperience: number;
};

export type MenuItemRecord = {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  priceCents: number;
  costCents: number;
  available: boolean;
};

export type OrderRecord = {
  id: string;
  restaurantId: string;
  menuItemId: string | null;
  quantity: number;
  orderedAt: Date;
  revenueCents: number;
  preparationMinutes: number;
};

export type CustomerReviewRecord = {
  id: string;
  restaurantId: string;
  menuItemId: string | null;
  receivedAt: Date;
  customer: string;
  rating: number;
  comment: string;
  channel: string;
  answered: boolean;
};
