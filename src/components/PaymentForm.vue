<template>
  <div class="item">
    <section>
      <h1>Make a new payment</h1>
      <p>Please fill in this form and press Send button to make your payment.</p>
      <br />
    </section>

    <div class="form_div" v-if="!submitted">
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
      </form>

      <button :disabled="locked" @click="saveTutorial" class="btn btn-success">Send</button>
      <p class="message" v-if="message">{{ message }}</p>
    </div>

    <div v-else>
      <h4>Your payment has been sent!</h4>
      <button class="btn btn-success" @click="viewPayment">viewPayment</button>
      <button class="btn btn-success" @click="newPayment">Make new payment</button>
    </div>
  </div>
</template>

<script>
import PaymentService from "../services/PaymentService";

function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          return (num < 10 ? '0' : '') + num;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
}

class Status {
  submitted;
  locked;
  message;

  constructor() {
    this.init();
  }

  init() {
    this.submitted = false;
    this.locked = false;
    this.message = "";
  }

  submit() {
    this.submitted = false;
    this.locked = true;
    this.message = "";
  }

  succeed() {
    this.submitted = true;
    this.locked = false;
    this.message = "";
  }

  fail(e) {
    this.submitted = false;
    this.locked = false;

    if (e.response.data) {
      // bad data
      console.log("The request was made and the server responded with a status code that falls out of the range of 2xx");

      let json = e.response.data;
      let errors = json.errors;
      this.message = "There are some issues with your payment. Please fix below issues and try again:\n";
      for (let key in errors) {
        console.log(errors[key]);
        this.message += key + ": " + errors[key] + "\n";
      }
    } else if (e.request) {
      // server down
      console.log("The request was made but no response was received", e.request);
      this.message = "Cannot connect to server. Please check your Internet connection.";
    } else {
      console.log("Something happened in setting up the request that triggered an Error", e.message);
      this.message = e.message;
    }
  }
}

export default {
  data() {
    return {
      currentPayment: {
        id: null,
        paymentType: "LOCAL",
        accountOrigin: "null",
        paymentDate: null,
        comissionCoverage: null,
        accountDestination: "",
        nameDestination: "",
        countryDestination: "LATVIA",
        bankDestination: "null",
        swift: "null",
        amount: 0,
        currency: "EUR",
        reason: "",
      },
      status: new Status(),
    };
  },

  methods: {
    saveTutorial() {
      this.status.submit();

      let date = new Date(new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
      // let dateOffset = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      let dateString = toIsoString(date);

      this.currentPayment.paymentDate = dateString;

      // bind because otherwise catch cannot set error message with this.message
      // https://stackoverflow.com/a/41654266/4673960
      PaymentService.create(this.currentPayment)
        .then((response) => {
          console.log(response);
          console.log(response.headers);

          this.status.succeed();
          console.log(response.data);

          alert("Please check your inbox for a confirmation link!");
          this.$router.push({ path: "/payment-details/" + response.data.id });
        })

        .catch(
          function (error) {
            this.status.fail(error);
          }.bind(this)
        );
    },

    viewPayment() {},

    newPayment() {
      this.status.init();
    },
  },

  computed: {
    locked() {
      return this.status.locked;
    },
    message() {
      return this.status.message;
    },
    submitted() {
      return this.status.submitted;
    },
  },
};
</script>
