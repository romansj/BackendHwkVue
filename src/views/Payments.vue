<script setup>
import { Head } from "@vueuse/head";
</script>

<template>
  <Head>
    <title>All payments</title>
  </Head>

  <div>
    <section>
      <h1>All payments</h1>
      <p>Below is a list of all payments you've made</p>
      <br />
    </section>
    <section>
      <div v-if="payments">
        <div @click="$router.push('/payment-details/' + payment.id)" class="payment_card" v-bind:key="payment.id" v-for="payment in payments">
          <span>#{{ payment.id }} {{ payment.status }}</span>
          <p>{{ payment.paymentDate }}</p>
          <p>{{ payment.amount }} {{ payment.currency }}</p>
        </div>
      </div>
      <p v-else class="message">{{message}}</p>
    </section>
    <br />
  </div>
</template>

<style scoped>
.payment_card {
  margin-bottom: 1rem;
  padding: 2rem;
  border: 2px solid var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.payment_card:hover {
  border: 2px solid var(--color-accent);
}
</style>

<script>
import PaymentService from "../services/PaymentService";

export default {
  data() {
    return {
      payments: [],
      message:null,
    };
  },

  methods: {
    retrievePayments() {
      PaymentService.getAll()
        .then((response) => {
          this.payments = response.data;
          console.log(response.data, response.status);

          if (response.status==204){
            this.message = "No payment data found"
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrievePayments();
  },
};
</script>
