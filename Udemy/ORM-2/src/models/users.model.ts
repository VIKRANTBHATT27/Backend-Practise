import { uuid, pgTable, varchar, text } from "drizzle-orm/pg-core";

const userTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    salt: text().notNull(),
});

export default userTable;