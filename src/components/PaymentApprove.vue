<template>
  <div class="item">
    <section>
      <h4>Payment approval</h4>
      <p class="message" v-if="message">{{ message }}</p>
    </section>

    <button class="btn btn-success" @click="$router.push('/payment/')">Make new payment</button>
  </div>
</template>

<script>
import PaymentService from "../services/PaymentService";


export default {
  data() {
    return {
      currentPayment: null,
      message:"Approving payment...",
    };
  },

  methods: {
    approvePayment(token) {
      PaymentService.approve(token)
        .then((response) => {
          this.currentPayment = response.data;
          console.log(response.data);
          this.message="Payment approved!";
        })
        .catch(
          function (error) {
            this.message="Failed to approve payment.";
          }.bind(this)
        );
    },
  },

  mounted() {
    let token = this.$route.query.token;
    console.log("token: ", token);
    this.approvePayment(token);
  },
};
</script>
