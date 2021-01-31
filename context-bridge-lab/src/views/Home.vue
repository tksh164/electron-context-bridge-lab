<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <button @click="method1">method1</button>
    </div>
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

  method1(): void {
    console.log("method1");
    const { exposedApi } = window;
    exposedApi.method1("Hello");
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
