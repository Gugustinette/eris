<template>
  <router-link class="navbar-route" :to="to">
    {{ content }}
  </router-link>
</template>

<script>
export default {
  name: "option-navbar-route",
  props: {
    to: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-route {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding: 0px 10px;
  text-decoration: none;
  text-align: center;
}
</style>
