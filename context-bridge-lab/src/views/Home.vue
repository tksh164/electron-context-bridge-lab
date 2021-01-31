<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div><button @click="doSomething1">doSomething1</button></div>
    <div><button @click="doSomething2">doSomething2</button></div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  mounted(): void {
    console.log("[Renderer:doSomething3] Register the listener for doSomething3.");

    // Register the listener for the doSomething3.
    window.exposedApi.registerDoSomething3Listener((message: string) => {
      console.log("[Renderer:doSomething3] Received a message: message = " + message);
    });
  }

  // The sync call without the return value from the renderer to the main via the preload script.
  doSomething1(): void {
    console.log("[Renderer:doSomething1] Call doSomething1().");
    const { exposedApi } = window;
    exposedApi.doSomething1("Message from the renderer");
  }

  // The async call with the return value from the renderer to the main via the preload script.
  async doSomething2(): Promise<void> {
    console.log("[Renderer:doSomething2] Call doSomething2().");
    const result = await window.exposedApi
      .doSomething2("Message")
      .then((result: number) => {
        return result;
      })
      .catch((err: string) => {
        console.log("[Renderer:doSomething2] err = " + err);
      });
    console.log("[Renderer:doSomething2] result = " + result);
  }
}
</script>
