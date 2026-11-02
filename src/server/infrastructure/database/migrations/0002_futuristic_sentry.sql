CREATE TABLE `ai_dashboard_summaries` (
	`input_hash` text PRIMARY KEY NOT NULL,
	`restaurant_id` text NOT NULL,
	`summary` text NOT NULL,
	`created_at` integer NOT NULL
);
