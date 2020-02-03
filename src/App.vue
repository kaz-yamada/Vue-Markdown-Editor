<template>
  <div id="app">
    <Topbar />
    <div class="main">
      <Sidebar />
      <Editor @update-value="updateValue" />
      <SaveFileDialog @save-completed="saveToFile" />
    </div>
  </div>
</template>

<script>
import Topbar from "./components/Topbar";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import SaveFileDialog from "./components/SaveFileDialog";

import { saveAsMarkdown, saveAsPDF } from "./util";

export default {
  name: "app",
  components: {
    Editor,
    Topbar,
    SaveFileDialog,
    Sidebar
  },
  data() {
    return {
      markdownText: "",
      isDialogOpen: false
    };
  },
  methods: {
    updateValue(text) {
      this.markdownText = text;
    },
    saveToFile(filename, filetype) {
      filename = `${filename}.${filetype}`;
      const blob = new Blob([this.markdownText], {
        type: "text/plain;charset=utf-8;"
      });
      if (filetype === "md") {
        saveAsMarkdown(blob, filename);
      } else if (filetype === "pdf") {
        saveAsPDF(this.markdownText);
      }

      this.isDialogOpen = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  height: 100%;
  display: grid;
  grid-auto-rows: auto 1fr;
}

.main {
  height: 100%;
  overflow: hidden;
  padding: 12px;
  display: grid;
  grid-template-columns: 25% 1fr;
}

.grid-item {
  overflow: hidden;
}
</style>
