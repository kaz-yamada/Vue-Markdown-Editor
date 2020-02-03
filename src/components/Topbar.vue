<template>
  <b-navbar class="top-bar">
    <b-navbar-brand tag="h1" class="mb-0">Vue Reader</b-navbar-brand>
    <b-nav-text>A markdown reader built with VueJS</b-nav-text>

    <b-navbar-nav class="ml-auto">
      <b-button @click="showModal" variant="primary" ref="#btnShow">
        Save to file
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Topbar",
  methods: {
    showModal() {
      this.$root.$emit("bv::show::modal", "save-file-modal", "#btnShow");
    }
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  flex-flow: row;
  align-items: baseline;
}
</style>
