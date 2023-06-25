// Remember current search in page URL as ?search=...

import { Accessor, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';

export const rememberSearch = (search: Accessor<string>) => {
  const navigate = useNavigate();
  createEffect(() => {
    const url = globalThis.location;
    const oldPath = `${url.pathname}${url.search}${url.hash}`;
    const newPath = search()
      ? `${url.pathname}?search=${search()}${url.hash}`
      : `${url.pathname}${url.hash}`;
    if (oldPath === newPath) return;
    navigate(newPath, { replace: true, scroll: false });
  });
};
