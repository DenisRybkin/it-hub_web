import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import { Skeleton } from '@components/ui/skeleton';

export const UserViewSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl bg-dark-2 p-3 md:p-7">
      <div className="flex flex-wrap gap-2 items-center justify-between mb-3 md:mb-5">
        <Skeleton className="rounded-full w-16 h-16 lg:w-40 lg:h-40" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 lg:h-7 w-14 lg:w-24" />
          <Skeleton className="h-4 lg:h-7 w-6 lg:w-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 lg:h-7 w-14 lg:w-24" />
          <Skeleton className="h-4 lg:h-7 w-6 lg:w-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 lg:h-7 w-14 lg:w-24" />
          <Skeleton className="h-4 lg:h-7 w-6 lg:w-10" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 lg:h7 w-14 lg:w-24" />
        <Skeleton className="h-5 lg:h7 w-16 lg:w-28" />
        <Skeleton className="h-5 lg:h7 w-20 lg:w-32" />
        <div className="border w-full my-2 border-slate-500 dark:border-slate-400" />
        <Skeleton className="h-5 w-24" />
        <CategoryCardList />
      </div>
    </div>
  );
};
