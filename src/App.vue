<template>
  <div id="app" class="bg-gray-300 h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MarkdownEditor",
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("SET_TOKEN", token);
    }

    const user = localStorage.getItem("user");
    if (user) {
      this.$store.commit("SET_USER", JSON.parse(user));
    }
  }
};
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");

html {
  font-family: "Inter", sans-serif !important;
}

@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}
</style>
