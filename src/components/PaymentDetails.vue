<template>
  <div>
    <router-link :to="'/payments/'">Back</router-link>
    <br><br>
    <section>
      <h1>Your payment</h1>
      <p>Below are the details of your payment</p>
      <br />
    </section>

    <section>
      <p class="message" v-if="message"><strong>{{ message }}</strong></p>

      <div class="form_div" v-if="currentPayment">
        <form>
          <div class="form-group">
            <label for="accountDestination">Payee account</label>
            <input :disabled="locked" type="text" class="form-control" id="accountDestination" v-model="currentPayment.accountDestination" />
          </div>

          <div class="form-group">
            <label for="nameDestination">Payee name</label>
            <input :disabled="locked" type="text" class="form-control" id="nameDestination" v-model="currentPayment.nameDestination" />
          </div>

          <div class="form-group">
            <label for="amount">Amount</label>
            <input :disabled="locked" type="text" class="form-control" id="amount" v-model="currentPayment.amount" />
          </div>

          <div class="form-group">
            <label for="reason">Reason</label>
            <input :disabled="locked" type="text" class="form-control" id="reason" v-model="currentPayment.reason" />
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <input :disabled="locked" type="text" class="form-control" id="status" v-model="currentPayment.status" />
          </div>
        </form>
      </div>


    </section>
  </div>
</template>

<script>
import PaymentService from "../services/PaymentService";


export default {
  data() {
    return {
      message:"",
      locked:true,
      currentPayment: null,
    };
  },

  methods: {
    getTutorial(id) {
      PaymentService.get(id)
        .then((response) => {
          this.currentPayment = response.data;
          console.log(response.data);
        })
        .catch(
          function (error) {
            console.log(error);
            this.message="Could not find payment";
          }.bind(this)
        );
    },
  },

  computed: {

  },

  mounted() {
    this.getTutorial(this.$route.params.id);
  },
};
</script>
