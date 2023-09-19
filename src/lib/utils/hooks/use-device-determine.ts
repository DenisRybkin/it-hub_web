import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceDetermine = (): [DeviceType, number] => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
    () => {
      if (window.innerWidth < 768) {
        return 'mobile';
      } else if (window.innerWidth < 900) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    }
  );

  const handleDetermine = () => {
    setScreenWidth(window.innerWidth);
    setDeviceType(() => {
      if (window.innerWidth <= 768) {
        return 'mobile';
      } else if (window.innerWidth <= 900) {
        return 'tablet';
      } else {
        return 'desktop';
      }
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
