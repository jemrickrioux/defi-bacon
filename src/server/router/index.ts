// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { participationsRouter } from "./participations";
import {goalRouter} from "./goal";
import {participantsRouter} from "./participant";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("goal.", goalRouter)
    .merge("participations.", participationsRouter)
    .merge("participants.", participantsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
