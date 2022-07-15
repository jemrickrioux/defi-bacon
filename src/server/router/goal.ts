import { createRouter } from "./context";
import { z } from "zod";



export const goalRouter = createRouter()
    .mutation("update", {
        input: z.number(),
        async resolve({input, ctx}) {
            return await ctx.prisma.goal.update(
                {
                    where: {
                        id: 1
                    },
                    data: {
                        distance: input
                    }
                }
            );
        }
    })
    .query("totalDistance", {
        async resolve({ ctx }) {
            const goal = await ctx.prisma.goal.aggregate({
                _sum: {
                    distance: true
                }
            });
            return goal._sum.distance
        }
    })
