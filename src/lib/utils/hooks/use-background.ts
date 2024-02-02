import { Property } from 'csstype';
import { useEffect } from 'react';

export const useBackground = (
  image: string,
  size: Property.BackgroundSize = 'cover'
) => {
  console.log(5555);
  useEffect(() => {
    console.log(3333);
    document.body.style.setProperty('--background-image', `url("${image}")`);
    document.body.style.setProperty('--background-size', size as string);

    return () => {
      console.log(4444);
      document.body.style.removeProperty('--background-image');
      document.body.style.removeProperty('--background-size');
    };
  }, []);
};
