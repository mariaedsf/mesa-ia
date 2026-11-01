CREATE TABLE `action_plans` (
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
	`source` text DEFAULT 'seed' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `diagnostic_plan_items` (
	`recommendation_id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `menu_item_states` (
	`id` text PRIMARY KEY NOT NULL,
	`available` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recommendation_states` (
	`id` text PRIMARY KEY NOT NULL,
	`completed` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review_states` (
	`id` text PRIMARY KEY NOT NULL,
	`answered` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `simulation_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inputs` text NOT NULL,
	`results` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workspace_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`restaurant` text NOT NULL
);
