import { defineUI, env } from "prisma/UI";

export default defineUI({
    schema: "prisma/schema.prisma",
    migrations: { path: "prisma/migrations" },
    engine: "classic",
    datasource: { url: env("DATABASE_URL") },
});
