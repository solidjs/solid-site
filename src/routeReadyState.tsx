import { useData } from 'solid-app-router';
import { createComputed, createSignal } from 'solid-js';

export const [routeReadyState, setRouteReadyState] = createSignal(
  { loading: false, routeChanged: false },
  { equals: false },
);

export const useRouteReadyState = () => {
  try {
    const data = useData<{ loading: boolean }>();

    createComputed(() => {
      if (!data.loading) {
        setRouteReadyState((prev) => ({ ...prev, loading: false }));
        setTimeout(() => {
          // @ts-ignore
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      }
    });
  } catch (err) {
    setRouteReadyState((prev) => ({ ...prev, loading: false }));
    setTimeout(() => {
      // @ts-ignore
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
};
