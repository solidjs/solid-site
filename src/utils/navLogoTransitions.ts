import { createEventListener } from '@solid-primitives/event-listener';
import { reflow } from '.';

const logoWidth = '56px';

const resetTransform = (el: HTMLElement) => {
  el.style.transform = '';
  el.style.transformOrigin = '';
};
export const onEnterLogo = (logoEl: HTMLElement, isRTL: boolean) => {
  const navList = logoEl.nextElementSibling as HTMLElement;
  const elements = [logoEl, navList];

  logoEl.style.transformOrigin = `${isRTL ? 'right' : 'left'} center`;
  navList.style.transform = `translateX(${isRTL ? '' : '-'}${logoWidth})`;

  reflow();
  navList.style.transform = `translateX(0)`;
  createEventListener(
    logoEl,
    'transitioned',
    (e) => {
      if (e.target !== e.currentTarget) return;
      elements.forEach(resetTransform);
    },
    { once: true },
  );
};

export const onExitLogo = (logoEl: HTMLElement, isRTL: boolean) => {
  const navList = logoEl.nextElementSibling as HTMLElement;
  const elements = [logoEl, navList];

  navList.style.transform = `translateX(${isRTL ? '-' : ''}${logoWidth})`;

  reflow();
  logoEl.style.transformOrigin = `${isRTL ? 'right' : 'left'} center`;
  navList.style.transform = `translateX(0)`;

  elements.forEach((el) => {
    el.style.backfaceVisibility = 'hidden';
  });

  createEventListener(
    logoEl,
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;
      elements.forEach((el) => {
        resetTransform(el);
        el.style.backfaceVisibility = '';
      });
    },
    { once: true },
  );
};
