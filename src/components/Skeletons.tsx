const shimmer = `
  animate-pulse rounded-xl
`;

export const CardSkeleton = () => {
  return (
    <div className={`${shimmer} h-[23rem] w-full  bg-gray-100   shadow-sm`}>
      <div className={`h-4/5 w-full  bg-gray-100`}></div>
      <div className="mt-4 space-y-2 p-2">
        <h2 className={`bg-gray-300 w-3/4 h-5  rounded-lg `}></h2>
        <h2 className={`bg-gray-300 w-1/2 h-5  rounded-lg`}></h2>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className={"grid grid-cols-1 lg:grid-cols-7 gap-7 "}>
      <div
        className={`${shimmer} lg:col-span-4 bg-gray-200 rounded-xl h-[70vh] lg:h-[calc(100vh-5rem)]`}
      ></div>
      <div className={` lg:col-span-3 space-y-3`}>
        <h2 className={`${shimmer} bg-gray-200 w-3/4 h-6`}></h2>
        <h2 className={`${shimmer} bg-gray-200 w-1/2 h-5`}></h2>
        <h2 className={`${shimmer} bg-gray-200 w-1/2 h-5`}></h2>
      </div>
    </div>
  );
};

const CardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export function DashboardCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function DashboardCardsSkeleton() {
  return (
    <>
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
      </div>
    </>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-5 w-full">
      {/*title and description skeleton */}

      <div className="p-3 border-[1.3px] border-gray-300 rounded-lg">
        <div className="mb-4">
          <div className="h-5 w-1/4 bg-gray-300 mb-2 rounded-lg"></div>
          <div className={`${shimmer} h-9 bg-gray-200`}></div>
        </div>
        <div>
          <div className="h-5 w-1/4 bg-gray-300 mb-2 rounded-lg"></div>
          <div className={`${shimmer} h-32 bg-gray-200 mb-4`}></div>
        </div>
      </div>

      {/* image */}
      <div className="p-3 border-[1.3px] border-gray-300 rounded-lg">
        <div className="h-5 w-1/4 bg-gray-300 mb-2 rounded-lg"></div>
        <div className={`${shimmer} h-32 bg-gray-200`}></div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="w-full border border-gray-300  overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-300 p-4 flex gap-4">
        <div className={`${shimmer} h-4 w-1/4 bg-gray-200 `}></div>
        <div className={`${shimmer} h-4 w-1/4 bg-gray-200 `}></div>
        <div className={`${shimmer} h-4 w-1/4 bg-gray-200`}></div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-300">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="px-4 py-5 flex gap-4">
            <div className={`${shimmer} h-4 w-1/4 bg-gray-200 `}></div>
            <div className={`${shimmer} h-4 w-1/4 bg-gray-200 `}></div>
            <div className={`${shimmer} h-4 w-1/4 bg-gray-200`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-xl h-28  bg-gray-200 `}
        ></div>
      ))}
    </div>
  );
}

export default CardsSkeleton;
