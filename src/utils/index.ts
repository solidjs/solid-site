export const reflow = () => document.body.clientWidth;

export const preventSmoothScrollOnTabbing = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    document.documentElement.style.scrollBehavior = '';

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    });
  });
};
