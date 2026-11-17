import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

declare const process: { env: { DATABASE_URL?: string } };

const config = defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: "./src/models/index.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});

export default config;