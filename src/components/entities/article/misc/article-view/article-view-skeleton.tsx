import { Skeleton } from '@components/ui/skeleton';
import { CategoryCardSkeleton } from '@components/entities/category/misc/category-card';

export const ArticleViewSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl bg-dark-2 p-3 md:p-7">
      <div className="flex w-full justify-between items-center ">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="rounded-full w-10 h-10" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-5 rounded-full" />
            <Skeleton className="w-24 h-4 rounded-full" />
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
      </div>
      <div className="w-full flex flex-col gap-1 mt-4">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="w-full h-36 rounded-lg" />
        <Skeleton className="w-full h-60 rounded-lg" />
        <Skeleton className="w-full h-60 rounded-lg" />
        <Skeleton className="w-full h-72 rounded-lg" />
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Skeleton className="rounded-full h-8 w-8" />
        <Skeleton className="rounded-full h-8 w-8" />
      </div>
    </div>
  );
};
