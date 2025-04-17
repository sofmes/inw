PRAGMA foreign_keys=OFF;

CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`image` text,
	`description` text,
	`created_at` integer NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `idea` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`authorId` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`tagIds` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL UNIQUE
);

PRAGMA foreign_keys=ON;