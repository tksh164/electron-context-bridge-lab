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

  // Register the listener for the doSomething3.
  registerDoSomething3Listener: async (listener: Function): Promise<void> => {
    // NOTE: The listener is registered when every view change. As a result, the multiple listeners registered.
    // It leads multiple listeners fired by single call. So, remove the existing listeners before register new one.
    ipcRenderer.removeAllListeners("do-something3");
    ipcRenderer.on("do-something3", (event, args) => { listener(args); })
  }
});
