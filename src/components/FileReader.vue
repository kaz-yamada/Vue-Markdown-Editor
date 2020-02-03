<template>
  <label class="text-reader form-control-file">
    Upload a markdown file to read
    <input type="file" @change="loadFromFile" />
  </label>
</template>

<script>
export default {
  methods: {
    loadFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      const fileExtension = file
        .split(".")
        .pop()
        .toLowerCase();

      if (fileExtension === "md") {
        reader.onload = e => this.$root.$emit("file-loaded", e.target.result);
        reader.readAsText(file);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.text-reader {
  display: block;
  margin-bottom: 1em;
  padding: 6px;
  border: solid 1px black;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: rgba(25, 107, 173, 0.3);
    border-color: rgb(25, 107, 173);
  }
}

input {
  padding: 6px 0;

  &:focus {
    outline: none;
  }
}
</style>
