import { createRouter } from "./context";
import { z } from "zod";



export const participantsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.participant.findMany();
    },
  })
    .query("search", {
        input: z.string(),
        async resolve({ input, ctx }) {
            return await ctx.prisma.participant.findMany({
                where: {
                    name: {
                        contains: input
                    }
                }
            });
        }
    })
    .query("getOne", {
        input: z.number(),
        async resolve({input, ctx}) {
            return await ctx.prisma.participant.findUnique({
                where: {
                    id: input
                },
                include: {
                    participations: true
                }
            });
        }
    })
    .query("totalDistance", {
        input: z.number(),

        async resolve({ ctx, input }) {
            const total =  await ctx.prisma.participation.aggregate({
                where: {
                    participantId: {
                        equals: input
                    }
                },
                _sum: {
                    distance: true,
                }

            });
            console.log(total)
            return total._sum.distance
        }
    })

