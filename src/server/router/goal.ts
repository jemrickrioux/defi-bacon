import { createRouter } from "./context";
import { z } from "zod";



export const goalRouter = createRouter()
    .query("totalDistance", {
        async resolve({ ctx }) {
            return await ctx.prisma.goal.aggregate({
                _sum: {
                    distance: true
                }
            });
        }
    })
