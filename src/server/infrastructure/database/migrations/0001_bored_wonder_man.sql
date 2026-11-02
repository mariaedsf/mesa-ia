CREATE TABLE `ai_usage_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`restaurant_id` text NOT NULL,
	`menu_item_id` text,
	`received_at` integer NOT NULL,
	`customer` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`channel` text NOT NULL,
	`answered` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `menu_items` (
	`id` text PRIMARY KEY NOT NULL,
	`restaurant_id` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`price_cents` integer NOT NULL,
	`cost_cents` integer NOT NULL,
	`available` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `operational_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`restaurant_id` text NOT NULL,
	`menu_item_id` text,
	`quantity` integer DEFAULT 1 NOT NULL,
	`ordered_at` integer NOT NULL,
	`revenue_cents` integer NOT NULL,
	`preparation_minutes` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `restaurants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`team_size` integer NOT NULL,
	`stations` integer NOT NULL,
	`team_experience` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `restaurants_name_unique` ON `restaurants` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_action_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`responsible` text NOT NULL,
	`role` text NOT NULL,
	`initials` text NOT NULL,
	`due` text NOT NULL,
	`day` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`status` text NOT NULL,
	`icon` text NOT NULL,
	`overdue` integer DEFAULT false NOT NULL,
	`source` text DEFAULT 'manual' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_action_plans`("id", "title", "description", "responsible", "role", "initials", "due", "day", "date", "time", "status", "icon", "overdue", "source") SELECT "id", "title", "description", "responsible", "role", "initials", "due", "day", "date", "time", "status", "icon", "overdue", "source" FROM `action_plans`;--> statement-breakpoint
DROP TABLE `action_plans`;--> statement-breakpoint
ALTER TABLE `__new_action_plans` RENAME TO `action_plans`;--> statement-breakpoint
PRAGMA foreign_keys=ON;