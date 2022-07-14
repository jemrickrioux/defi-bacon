import { createRouter } from "./context";
import { z } from "zod";


const addParticipation =  z.object({
    name: z.string(),
    distance: z.number(),
    date: z.date()
})

export const participationsRouter = createRouter()
    .mutation("addOne", {
        input: addParticipation,
        async resolve({input, ctx}) {
            return await ctx.prisma.participation.create(
                {
                    data: input
                }
            );
        }
    })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.participation.findMany();
    },
  })
    .query("totalDistance", {
        async resolve({ ctx }) {
            return await ctx.prisma.participation.aggregate({
                _sum: {
                    distance: true
                }
            });
        }
    })
