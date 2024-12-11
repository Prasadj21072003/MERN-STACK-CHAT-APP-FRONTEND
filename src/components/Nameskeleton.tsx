import { memo } from "react";

const Nameskeleton = memo(() => {
  const array = [0, 1, 2, 3, 4, 5];
  return (
    <div className=" h-full">
      {array.map((_, i) => (
        <div
          className="px-[20px] h-[70px] lg:h-[80px] w-full border-y-[1px] border-slate-700 flex items-center gap-[20px]  "
          key={i}
        >
          <div className="w-[50px] h-[50px] rounded-full bg-gray-500 animate-pulse "></div>
          <div className="w-[30%] flex flex-col gap-[10px]">
            <div className="w-full bg-gray-500 animate-pulse h-[10px]"></div>
            <div className="w-[70%] bg-gray-500 animate-pulse h-[10px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Nameskeleton;
