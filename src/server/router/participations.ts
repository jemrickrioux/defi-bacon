import { createRouter } from "./context";
import { z } from "zod";

const addParticipation = z.object({
  name: z.string(),
  distance: z.number(),
  date: z.date(),
});

export const participationsRouter = createRouter()
  .mutation("addOne", {
    input: addParticipation,
    async resolve({ input, ctx }) {
      const participant = await ctx.prisma.participant.findUnique({
        where: {
          name: input.name,
        },
      });
      let id = 0;
      if (participant === null) {
        const res = await ctx.prisma.participant.create({
          data: {
            name: input.name,
          },
        });
        id = res.id;
      } else {
        id = participant.id;
      }
      return await ctx.prisma.participation.create({
        data: {
          distance: input.distance,
          date: input.date,
          participant: {
            connect: {
              id,
            },
          },
        },
      });
    },
  })

  .mutation("removeOne", {
    input: z.number(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.participation.delete({
        where: {
          id: input,
        },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.participation.findMany({
        include: {
          participant: true,
        },
        orderBy: {
          date: "desc",
        },
      });
    },
  })
  .query("byParticipantId", {
    input: z.number(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.participation.findMany({
        include: {
          participant: true,
        },
        where: {
          participant: {
            id: input,
          },
        },
      });
    },
  })
  .query("kmByDate", {
    async resolve({ input, ctx }) {
      return await ctx.prisma.participation.groupBy({
        by: ["date"],
        _sum: {
          distance: true,
        },
      });
    },
  })
  .query("totalDistance", {
    async resolve({ ctx }) {
      const total = await ctx.prisma.participation.aggregate({
        _sum: {
          distance: true,
        },
      });
      return total._sum.distance;
    },
  });
