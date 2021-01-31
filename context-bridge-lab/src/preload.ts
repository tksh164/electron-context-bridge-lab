import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("exposedApi", {
  // The sync call without the return value from the renderer to the main via the preload script.
  doSomething1: (message: string): void => {
    ipcRenderer.send("do-something1", message);
  },

  // The async call with the return value from the renderer to the main via the preload script.
  doSomething2: async (message: string): Promise<number> => {
    return ipcRenderer.invoke("do-something2", message);
  },
  registerMehtod3Listener: async (listener: Function): Promise<void> => {
    ipcRenderer.on("method3", (event, args) => { listener(args); })
  }
});
