import { useEffect, useState } from 'react';

type DeviceType = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const useDeviceDetermine = (): [DeviceType, number] => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (window.innerWidth < 640) return 'sm';
    else if (window.innerWidth < 768) return 'md';
    else if (window.innerWidth < 1024) return 'lg';
    else if (window.innerWidth < 1280) return 'xl';
    else return '2xl';
  });

  const handleDetermine = () => {
    setScreenWidth(window.innerWidth);
    setDeviceType(() => {
      if (window.innerWidth < 640) return 'sm';
      else if (window.innerWidth < 768) return 'md';
      else if (window.innerWidth < 1024) return 'lg';
      else if (window.innerWidth < 1280) return 'xl';
      else return '2xl';
    });
  };

  useEffect(() => {
    handleDetermine();
    window.addEventListener('resize', () => {
      handleDetermine();
    });
    return window.removeEventListener('resize', handleDetermine);
  }, []);

  return [deviceType, screenWidth];
};
