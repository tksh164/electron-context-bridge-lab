export interface ExposedApi {
  method1: (message: string) => void;
  method2: (message: string) => Promise<number>;
}
