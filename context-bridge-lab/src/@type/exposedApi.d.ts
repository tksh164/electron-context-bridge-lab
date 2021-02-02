export interface ExposedApi {
  doSomething1: (message: string) => void;
  doSomething2: (message: string) => Promise<number>;
  addDoSomething3Listener: (listener: Function) => Promise<void>;
}
