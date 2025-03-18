import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "../trpc";

type WeeklyPlan = Record<
  string,
  {
    breakfast: {
      name: string;
      ingredients: string;
      instructions: string;
    };
    lunch: {
      name: string;
      ingredients: string;
      instructions: string;
    };
    dinner: {
      name: string;
      ingredients: string;
      instructions: string;
    };
    summary: string;
  }
>;

export const plannerRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        ingredients: z.string().array().min(1, "Add at least one ingredient"),
      }),
    )
    .mutation(async ({ input }) => {
      const response = (await (
        await fetch(`${env.BACKEND_URL}/weekly-plan/generate`, {
          method: "POST",
          body: JSON.stringify({
            ingredients: input.ingredients,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()) as WeeklyPlan;

      return response
    }),
});
