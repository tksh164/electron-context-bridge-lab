<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div><button @click="doSomething1">doSomething1</button></div>
    <div><button @click="method2">method2</button></div>
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
    console.log("Register the method3 listener in the renderer.");
    window.exposedApi.registerMehtod3Listener((message: string) => {
      console.log("Received a message in the renderer: message = " + message);
    });
  }

  // The sync call without the return value from the renderer to the main via the preload script.
  doSomething1(): void {
    console.log("[Renderer] Call doSomething1().");
    const { exposedApi } = window;
    exposedApi.doSomething1("Message from the renderer");
  }

  async method2(): Promise<void> {
    console.log("method2");
    const result = await window.exposedApi
      .method2("Method2")
      .then((result: number) => {
        return result;
      })
      .catch((err: string) => {
        console.log("err = " + err);
      });
    console.log("result = " + result);
  }
}
</script>
