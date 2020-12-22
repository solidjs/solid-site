import { moduleHotAccept } from '../main';

test('calls hot', () => {
  const reloadSpy = jest.fn();
  window = Object.create(window);
  Object.defineProperty(window, "location", {
      value: {
        reload: reloadSpy,
      },
      // writable: true
  });
  const acceptSpy = jest.fn((cb: () => void) => cb());
  const mod = {
    hot: {
      accept: acceptSpy,
    },
  };
  moduleHotAccept((mod as unknown) as NodeModule);
  expect(acceptSpy).toHaveBeenCalled();
  expect(reloadSpy).toHaveBeenCalled();
});
