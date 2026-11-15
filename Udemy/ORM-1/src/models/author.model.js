import { sql } from "drizzle-orm";
import { uuid, pgTable, varchar, integer, check } from "drizzle-orm/pg-core";

export const authorTable = pgTable("Authors", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    age: integer(),
}, (table) => [
    check("Authors_age_range", sql`${table.age} >= 0 AND ${table.age} <= 135`)
]);