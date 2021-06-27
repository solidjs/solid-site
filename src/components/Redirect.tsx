import { useRouter } from 'solid-app-router';

export const Redirect = (path: string) => () => {
  const [, { push }] = useRouter()!;
  push(path);
  return <></>;
};
