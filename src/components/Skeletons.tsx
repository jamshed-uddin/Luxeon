const shimmer = `
  relative overflow-hidden  rounded-lg w-full 
  before:absolute before:inset-0 before:bg-gradient-to-r 
  before:from-transparent before:via-white/100 before:to-transparent 
  before:animate-shimmer
`;

export const CardSkeleton = () => {
  return (
    <div
      className={`${shimmer} h-[23rem] w-full  bg-gray-100 p-1 rounded-xl shadow-sm`}
    >
      <div className={`h-4/5 w-full rounded-t-xl bg-gray-50`}></div>
      <div className="mt-4 space-y-2">
        <h2 className={`bg-gray-50 w-3/4 h-4 `}></h2>
        <h2 className={`bg-gray-50 w-1/2 h-4`}></h2>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className={"grid grid-cols-1 lg:grid-cols-7 gap-7 "}>
      <div
        className={`${shimmer} lg:col-span-4 bg-gray-100 rounded-xl h-[calc(100vh-5rem)]`}
      ></div>
      <div className={` lg:col-span-3 space-y-2`}>
        <h2 className={`${shimmer} bg-gray-50 w-3/4 h-5`}></h2>
        <h2 className={`${shimmer} bg-gray-50 w-1/2 h-4`}></h2>
        <h2 className={`${shimmer} bg-gray-50 w-1/2 h-4`}></h2>
      </div>
    </div>
  );
};

const CardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default CardsSkeleton;
