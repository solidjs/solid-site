// Remember current search in page URL as ?search=...

import { Accessor, createEffect } from 'solid-js';
import { useNavigate } from 'solid-app-router';

export const rememberSearch = (search: Accessor<string>) => {
  const navigate = useNavigate();
  createEffect(() => {
    const url = globalThis.location;
    const newUrl = search()
      ? `${url.pathname}?search=${search()}${url.hash}`
      : `${url.pathname}${url.hash}`;
    if (url.href === newUrl) return;
    navigate(newUrl, { replace: true, scroll: false });
  });
};
