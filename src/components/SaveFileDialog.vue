<template>
  <b-modal id="save-file-modal" title="Save markdown" @ok="handleSubmit">
    <b-form @submit.prevent="handleSubmit">
      <b-container fluid>
        <label class="sr-only" for="filename">Filename </label>
        <b-row>
          <b-col sm="9">
            <b-form-input
              type="text"
              id="filename"
              placeholder="Filename"
              v-model="filename"
              :required="true"
              :state="isValid"
              @input="validateInput"
            />
          </b-col>
          <b-col sm="3">
            <!-- <b-form-select v-model="selectedType">
        <option
          v-for="type in filetypes"
          :key="type.name"
          :value="type.extention"
        >
          {{ type.name }}
        </option>
      </b-form-select> -->
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "SaveFileDialog",
  data() {
    return {
      submitting: false,
      success: false,
      isValid: false,
      filename: null,
      selectedType: "md",
      filetypes: [
        { name: "Markdown", extention: "md" },
        { name: "PDF", extention: "pdf" }
      ]
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.validateInput();

      console.log(!this.isInvalid);

      if (!this.isInvalid) {
        this.$emit(
          "save-completed",
          encodeURI(this.filename),
          this.selectedType
        );
      }

      this.submitting = false;
    },
    validateInput() {
      this.isValid = this.filename.length > 0;
    }
  }
};
</script>
