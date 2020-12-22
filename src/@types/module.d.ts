declare interface NodeModule {
  hot: {
    accept(fn: () => void): void;
  };
}
