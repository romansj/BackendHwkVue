<script setup>
import { Head } from "@vueuse/head";
</script>

<template>
  <Head>
    <title>Home</title>
  </Head>

  <div>
    <section>
      <h1>Homework assignment</h1>
      <p>This is a basic frontend Vue.js app to test Spring Boot backend APIs</p>
      <br />
    </section>
    <button @click="makePayment">New payment</button>
  </div>
</template>

<script>
export default {
  methods: {
    makePayment() {
      this.$router.push({ path: "/payment/" });
    },
  },
};
</script>
