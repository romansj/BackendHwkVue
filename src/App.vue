<script setup>
import { defineComponent, computed, reactive } from "vue";
import { useHead } from "@vueuse/head";
</script>

<template>

  <header>
    <nav role="navigation">
      <div id="menuToggle">
        <!-- A fake / hidden checkbox is used as click reciever, so you can use the :checked selector on it. -->
        <div id="menuToggleDiv">
          <input type="checkbox" v-model="message" />

          <!-- Some spans to act as a hamburger. -->
          <span></span>
          <span></span>
          <span></span>
          <div></div>
        </div>

        <!-- Too bad the menu has to be inside of the button but hey, it's pure CSS magic. -->
        <ul id="menu" class="menuClosed">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/payments">All payments</RouterLink></li>
          <li><RouterLink to="/payment">New payment</RouterLink></li>
        </ul>
      </div>
    </nav>
  </header>

  <div class="content">
    <RouterView />
  </div>

  <footer>
    <p>2022 | Jānis Romāns</p>
  </footer>
</template>

<script>
import { sleep, noscript } from "./utils.js";

function getWordCount() {
  // let body = top.document.body;
  let body = document.getElementById("router_container");
  if (body) {
    let content = document.body["innerText" in document.body ? "innerText" : "textContent"];
    content = noscript(content);
    let wordCount = content.match(/\S+/g).length;
    wordCount -= 18; // remove header and footer content (LV)
    return wordCount;
  }
  return -1;
}

export default defineComponent({
  setup() {
    const siteData = reactive({
      title: `My website`,
      description: `My beautiful website`,
    });

    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    });
  },
  data() {
    return {
      message: false,

      wordCount: -1,
    };
  },

  watch: {
    // whenever question changes, this function will run
    message(isMenuOpen, wasMenuOpen) {
      // console.log(isMenuOpen + ", old: " + wasMenuOpen);
      this.toggleScrollability(isMenuOpen);
    },
    $route(to, from) {
      // console.log(to + ", old: " + from);

      this.updateMenuToggle(false);
      // react to route changes...

      // delay for all content to load
      this.requestUpdateWordCount();
    },
  },

  methods: {
    async toggleScrollability(isMenuOpen) {
      const [body] = document.getElementsByTagName("body");
      const menu = document.getElementById("menu");
      if (isMenuOpen) {
        body.classList.remove(`scrollable`);
        body.classList.add(`not_scrollable`);

        menu.classList.remove(`menuClosed`);
        menu.classList.add(`menuOpen`);
      } else {
        body.classList.add(`scrollable`);
        body.classList.remove(`not_scrollable`);

        menu.classList.add(`menuClosed`);
        menu.classList.remove(`menuOpen`);
      }
    },

    async updateMenuToggle(isOpen) {
      await sleep(200);
      // console.log("isOpen" + isOpen);
      this.message = isOpen;
    },

    async requestUpdateWordCount() {
      await sleep(300);
      this.wordCount = getWordCount();
    },
  },

  computed: {},
});
</script>

<style>
@import "@/assets/base.css";
@import "@/assets/layout.css";
@import "@/assets/menu.css";
@import "@/assets/components.css";
</style>
