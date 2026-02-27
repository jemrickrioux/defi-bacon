import {createRouter} from "./context";
import {z} from "zod";


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
                        contains: input,
                        mode: "insensitive"
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
            const grouped = await ctx.prisma.participation.groupBy({
                by: ["participantId"],
                _sum: {
                    distance: true,
                },
                orderBy: {
                    _sum: {
                        distance: "desc",
                    },
                },
                take: 10,
            });
            const participantIds = grouped.map((g) => g.participantId);
            const participants = await ctx.prisma.participant.findMany({
                where: { id: { in: participantIds } },
            });
            const participantMap = new Map(participants.map((p) => [p.id, p]));
            return grouped.map((g) => ({
                id: g.participantId,
                distance: g._sum.distance ?? 0,
                participant: participantMap.get(g.participantId),
            }));
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
            return total._sum.distance
        }
    })

