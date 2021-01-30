import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("exposedApi", {
  method1: (message: string): void => {
    ipcRenderer.send("exposed-method1", message);
  }
});
