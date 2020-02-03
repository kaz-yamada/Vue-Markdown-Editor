<template>
  <div class="sidebar form-group">
    <FileReader />
    <ul class="showdown-options">
      <li
        v-for="opt in Object.keys(options)"
        :class="typeof options[opt] === 'boolean' ? 'checkbox' : 'text'"
        :key="opt"
      >
        <b-form-checkbox
          v-if="typeof options[opt] === 'boolean'"
          v-model="options[opt]"
          >{{ opt }}
        </b-form-checkbox>

        <b-form-group v-else v-model="options[opt]" :label="opt" :for="opt">
          <b-form-input :id="opt" v-model="options[opt]"
        /></b-form-group>
      </li>
    </ul>
  </div>
</template>

<script>
import FileReader from "./FileReader";

export default {
  name: "Sidebar",
  components: {
    FileReader
  },
  data() {
    return {
      options: {
        omitExtraWLInCodeBlocks: false,
        noHeaderId: false,
        prefixHeaderId: false,
        rawPrefixHeaderId: false,
        ghCompatibleHeaderId: false,
        rawHeaderId: false,
        headerLevelStart: false,
        parseImgDimensions: false,
        simplifiedAutoLink: false,
        excludeTrailingPunctuationFromURLs: false,
        literalMidWordUnderscores: false,
        literalMidWordAsterisks: false,
        strikethrough: false,
        tables: false,
        tablesHeaderId: false,
        ghCodeBlocks: true,
        tasklists: false,
        smoothLivePreview: false,
        smartIndentationFix: false,
        disableForced4SpacesIndentedSublists: false,
        simpleLineBreaks: false,
        requireSpaceBeforeHeadingText: false,
        ghMentions: false,
        ghMentionsLink: "https://github.com/{u}",
        encodeEmails: true,
        openLinksInNewWindow: false,
        backslashEscapesHTMLTags: false,
        emoji: false,
        underline: false,
        completeHTMLDocument: false,
        metadata: false,
        splitAdjacentBlockquotes: false
      }
    };
  },
  methods: {
    updateOptions(newValue) {
      this.$root.$emit("options-changed", newValue);
    }
  },
  created() {
    this.updateOptions(this.options);
  },
  watch: {
    options: {
      handler: function(newValue) {
        this.updateOptions(newValue);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 12px;
  overflow: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
}
</style>
