import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';     //import types from here 

export const userTable = pgTable("users", {
    id: integer().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique()
});
