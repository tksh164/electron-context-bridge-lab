import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("exposedApi", {
  method1: (message: string): void => {
    ipcRenderer.send("exposed-method1", message);
  },
  method2: async (message: string): Promise<number> => {
    return ipcRenderer.invoke("exposed-method2", message);
  }
});
