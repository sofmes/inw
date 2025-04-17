import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	image: text("image"),
	description: text("description"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});

export const ideaTable = sqliteTable("idea", {
	id: integer().notNull().primaryKey({ autoIncrement: true }),
	authorId: text()
		.notNull()
		.references(() => users.id),
	name: text().notNull(),
	description: text().notNull(),
	tagIds: text({ mode: "json" }).$type<number[]>().notNull().default([]),
});

export const ideaReations = relations(ideaTable, ({ one }) => ({
	author: one(users, {
		fields: [ideaTable.authorId],
		references: [users.id],
	}),
}));

export const tagTable = sqliteTable("tag", {
	id: integer().notNull().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
});
