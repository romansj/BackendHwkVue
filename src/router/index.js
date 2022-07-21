import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },


    {
      path: "/payments",
      name: "payments",
      // route level code-splitting. this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Payments.vue"),
    },
    {
      path: "/payment",
      name: "payment",
      // route level code-splitting. this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/PaymentForm.vue"),
    },

    {
      path: "/payment-details/:id",
      name: "payment-details",
      component: () => import("../components/PaymentDetails.vue")
    },

    {
      path: "/payment-approve",
      name: "payment-approve",
      component: () => import("../components/PaymentApprove.vue")
    },



    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import("../views/404View.vue") },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: () => import("../views/404View.vue") },

  ],
  scrollBehavior () {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
});

export default router;
