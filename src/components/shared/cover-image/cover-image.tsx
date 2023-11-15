import { ReactNode } from 'react';

interface ICoverImageProps {
  bottomPanel?: ReactNode;
}

export const CoverImage = (props: ICoverImageProps) => {
  return (
    <div className="w-screen md:w-[calc(100vw-104px)] lg:w-[calc(100vw-231px)] h-10 bg-green -translate-x-2/4 ml-[50%] -mt-8"></div>
  );
};
