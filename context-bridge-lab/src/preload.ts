import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("exposedApi", {
  // The sync call without the return value from the renderer to the main via the preload script.
  doSomething1: (message: string): void => {
    ipcRenderer.send("do-something1", message);
  },
  method2: async (message: string): Promise<number> => {
    return ipcRenderer.invoke("exposed-method2", message);
  },
  registerMehtod3Listener: async (listener: Function): Promise<void> => {
    ipcRenderer.on("method3", (event, args) => { listener(args); })
  }
});
