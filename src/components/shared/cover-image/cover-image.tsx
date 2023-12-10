import { ReactNode } from 'react';
import { StaticField } from '@lib/api/models';

interface ICoverImageProps {
  image?: StaticField;
  bottomPanel?: ReactNode;
}

export const CoverImage = (props: ICoverImageProps) => {
  return (
    <div className="w-screen md:w-[calc(100vw-120px)] lg:w-[calc(100vw-246px)] relative bg-gray -translate-x-2/4 ml-[50%] -mt-8 [&>div]:hover:block">
      {props.image && (
        <img
          className="w-full object-cover max-h-56"
          src={props.image.url}
          alt=""
        />
      )}
      {props.bottomPanel && (
        <div className="hidden absolute bottom-5 right-5">
          {props.bottomPanel}
        </div>
      )}
    </div>
  );
};
