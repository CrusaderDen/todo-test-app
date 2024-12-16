import { useEffect } from 'react';
import nProgress from 'nprogress';

export const useProgressBar = (loading: boolean, error: string | null) => {
  useEffect(() => {
    if (loading) {
      nProgress.start();
    } else {
      nProgress.done();
    }

    if (error) {
      nProgress.done();
    }

    return () => {
      nProgress.done();
    };
  }, [loading, error]);
};
