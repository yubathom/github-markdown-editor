<template>
  <div id="app" class="bg-gray-300 h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MarkdownEditor"
};
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}

@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}
</style>
