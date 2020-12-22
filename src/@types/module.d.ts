declare interface NodeModule {
  hot: {
    accept(fn?: (...args: unknown[]) => unknown): void;
    dispose(fn?: (...args: unknown[]) => unknown): void;
  };
}
