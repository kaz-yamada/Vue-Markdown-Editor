<template>
  <div class="editor">
    <div class="grid-item">
      <textarea
        v-model="markdownText"
        @input="updateValue"
        @keydown.tab="onTabKeyPress($event)"
      />
    </div>
    <VueShowdown
      class="grid-item reader"
      :markdown="this.markdownText"
      :options="options"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { showdown, VueShowdown } from "vue-showdown";

import defaultFile from "../assets/test.md";

showdown.setFlavor("github");

Vue.use(VueShowdown);

export default {
  name: "Editor",
  components: {
    VueShowdown
  },
  data() {
    return { markdownText: "", options: {} };
  },
  methods: {
    updateValue() {
      this.$emit("update-value", this.markdownText);
    },
    onTabKeyPress(event) {
      event.preventDefault();
      const { target } = event;
      const caretPosition = target.selectionStart;
      const startText = this.markdownText.slice(0, caretPosition);
      const endText = this.markdownText.slice(caretPosition);

      // Insert tab
      this.markdownText = `${startText}\t${endText}`;

      target.value = this.markdownText;
      target.selectionEnd = target.selectionStart = caretPosition + 1;
    }
  },
  created: function() {
    this.markdownText = defaultFile;
    this.updateValue();
  },
  mounted() {
    this.$root.$on("file-loaded", data => {
      this.markdownText = data;
    });
    this.$root.$on("options-changed", options => {
      this.options = options;
    });
  }
};
</script>

<style scoped>
.editor {
  display: grid;
  grid-column-gap: 12px;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  overflow: auto;
}

.reader {
  border: solid 1px black;
  border-radius: 5px;
  padding: 6px 12px;
  overflow: auto;
}

textarea {
  font-family: "Courier New", Courier, monospace;
  width: 100%;
  height: 100%;
  resize: none;
  padding: 6px;
  tab-size: 2;
}
</style>
