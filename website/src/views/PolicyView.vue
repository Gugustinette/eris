<template>
  <div class="rules">
    <nav>
      <ErisLogo />
    </nav>
    <div class="content">
      <vue-markdown :source="src" />
    </div>
  </div>
</template>

<script>
// Markdown
import VueMarkdown from "vue-markdown-render";

import ErisLogo from "@/components/ErisLogo.vue";

export default {
  name: "PolicyView",
  components: {
    ErisLogo,
    VueMarkdown,
  },
  data() {
    return {
      src: "",
    };
  },
  mounted() {
    // Fetch the policy
    fetch("/policy/policy.md")
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        this.src = text;
      });
  },
};
</script>

<style lang="scss">
.rules {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 1920px;
  display: grid;
  place-items: center;

  .content {
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 25px;
    z-index: 2;

    h1 {
      margin: 10px 20px;
    }

    p {
      margin: 20px 30px;
    }

    ol {
      li {
        margin: 10px 80px;
      }
    }

    ul {
      li {
        margin: 10px 80px;
      }
    }

    strong {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>
