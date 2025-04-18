import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
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
		.references(() => userTable.id),
	name: text().notNull(),
	description: text().notNull(),
	tagIds: text({ mode: "json" }).$type<number[]>().notNull().default([]),
});

export const ideaReations = relations(ideaTable, ({ one }) => ({
	author: one(userTable, {
		fields: [ideaTable.authorId],
		references: [userTable.id],
	}),
}));

export const tagTable = sqliteTable("tag", {
	id: integer().notNull().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
});
