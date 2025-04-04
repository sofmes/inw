import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: integer().notNull().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	bio: text().notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
	ideas: many(ideaTable),
}));

export const ideaTable = sqliteTable("idea", {
	id: integer().notNull().primaryKey({ autoIncrement: true }),
	authorId: integer()
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
