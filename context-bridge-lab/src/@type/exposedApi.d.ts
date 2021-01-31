export interface ExposedApi {
  doSomething1: (message: string) => void;
  method2: (message: string) => Promise<number>;
  registerMehtod3Listener: (listener: Function) => Promise<void>;
}
