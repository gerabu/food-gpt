"use client";

import { api } from "@/trpc/react";
import IngredientsForm from "./_components/ingredients-form";
import PlanGrid from "./_components/plan-grid";

export default function PlannerPage() {
  const generatePlan = api.planner.generate.useMutation();

  function handleFormSubmit(ingredients: string[]) {
    generatePlan.mutate({ ingredients });
  }

  return (
    <section className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-2 md:min-h-min flex flex-col gap-y-4">
      <IngredientsForm
        onSubmit={handleFormSubmit}
        error={generatePlan.error?.data?.zodError?.fieldErrors.ingredients}
        pending={generatePlan.isPending}
      />
      {generatePlan.data && <PlanGrid data={generatePlan.data} />}
    </section>
  );
}
