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
                        distance: input,
                    }
                }
            );
        }
    })
    .query("totalDistance", {
        async resolve({ ctx }) {
            const goal = await ctx.prisma.goal.findUnique({
                where: {
                    id: 1
                }
            });
            console.log(goal)
            return goal?.distance
        }
    })
    .query("current", {
        async resolve({ ctx }) {
            const goal = await ctx.prisma.goal.findFirst({
                where: {
                    id: 1
                }
            });
            return goal?.current
        }
    })
