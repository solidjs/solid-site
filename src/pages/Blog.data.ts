import { RouteDataFunc, useLocation } from 'solid-app-router';
import { createEffect } from 'solid-js';

export const BlogData: RouteDataFunc = () => {
  const location = useLocation();
  return {
    get archive() {
      return location.pathname === '/blog';
    },
  };
};
