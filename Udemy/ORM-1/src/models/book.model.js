import { uuid, pgTable, varchar, index } from "drizzle-orm/pg-core";
import { authorTable } from "./author.model.js";

export const bookTable = pgTable("Books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: varchar({ length: 1024 }).notNull(),
    authorId: uuid().references(() => authorTable.id).notNull()
}, (table) => [
    index("title_index").on(table.title)
]);