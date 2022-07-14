// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { participationsRouter } from "./participations";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("participations.", participationsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
