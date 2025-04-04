CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`bio` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_idea` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`authorId` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`tagIds` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_idea`("id", "authorId", "name", "description", "tagIds") SELECT "id", "authorId", "name", "description", "tagIds" FROM `idea`;--> statement-breakpoint
DROP TABLE `idea`;--> statement-breakpoint
ALTER TABLE `__new_idea` RENAME TO `idea`;--> statement-breakpoint
PRAGMA foreign_keys=ON;