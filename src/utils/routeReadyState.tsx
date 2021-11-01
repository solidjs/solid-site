import { useData } from 'solid-app-router';
import { createComputed, createSignal } from 'solid-js';

export const [routeReadyState, setRouteReadyState] = createSignal(
  { loading: false, routeChanged: false },
  { equals: false },
);

export const useRouteReadyState = () => {
  const restorePageHeight = () => {
    const pageEl = document.body;
    pageEl.style.minHeight = '';
  };

  try {
    const data = useData<{ loading: boolean }>();

    createComputed(() => {
      if (!data.loading) {
        setRouteReadyState((prev) => ({ ...prev, loading: false }));
        setTimeout(() => {
          // @ts-ignore
          window.scrollTo({ top: 0, behavior: 'instant' });
          restorePageHeight();
        });
      }
    });
  } catch (err) {
    setRouteReadyState((prev) => ({ ...prev, loading: false }));
    setTimeout(() => {
      // @ts-ignore
      window.scrollTo({ top: 0, behavior: 'instant' });
      restorePageHeight();
    });
  }
};
