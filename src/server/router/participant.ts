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
    .query("leaderboard", {
        async resolve({ctx}) {
           const participation =  await ctx.prisma.participation.findMany({
                include: {
                    participant: true
                },
                orderBy: {
                    distance: "desc"
                }
            });
            let data = [] as any[];
            participation.map((l:any)=> {
                if (data[l.participant.id]) {
                    data[l.participant.id].distance += l.distance;
                } else {
                    data[l.participant.id] = l
                }
        })
            const res = Object.values(data).sort((a:any, b:any)=> {return b.distance - a.distance});
            return res
    }})
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

