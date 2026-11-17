import { usersTable } from "./index.ts";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

const userSessions = pgTable("user_sessions", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => usersTable.id).notNull(),
    createdAt: timestamp().defaultNow().notNull()
});

export default userSessions;