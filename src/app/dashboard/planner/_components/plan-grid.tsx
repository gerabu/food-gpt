import Link from "next/link";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Skeleton } from "@/components/ui/skeleton";

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

type PlannerGridProps = {
  data: WeeklyPlan;
};

export default function PlanGrid({ data }: PlannerGridProps) {
  return (
    <BentoGrid className="mx-auto max-w-4xl">
      {Object.entries(data).map(([day, { summary }], i) => (
        <BentoGridItem
          key={i}
          title={
            <Link href={`/day/${day}`} passHref>
              <p className="capitalize">{day}</p>
            </Link>
          }
          description={summary}
          header={
            <Skeleton className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />
          }
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
