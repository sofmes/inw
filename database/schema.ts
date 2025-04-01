import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ideaTable = sqliteTable("idea", {
  id: integer().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  tagIds: text({mode:"json"}).$type<number[]>().default([])
})

export const tagTable = sqliteTable("tag", {
  id: integer().notNull().primaryKey({autoIncrement: true}),
  name: text().notNull().unique()
})
