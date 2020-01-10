<template>
  <div class="w-full h-screen p-10">
    <div class="w-full text-right">
      <div
        @click.prevent="toggleView()"
        class="mb-4 px-4 py-2 border border-blue-700 text-blue-700 inline-block rounded cursor-pointer hover:bg-blue-100"
      >
        Trocar editor
      </div>
    </div>

    <div v-show="mode == 'html'">
      <tinymce
        id="d1"
        v-model="htmlContent"
        :other_options="other_options"
        @editorInit="editorInit"
        :toolbar1="
          'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | image'
        "
        :plugins="[
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample'
        ]"
        ref="tm"
        class="w-full h-128"
      >
      </tinymce>
    </div>

    <div v-show="mode == 'md'">
      <textarea v-model="mdContent" class="w-full h-128 p-6"></textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MarkdownIt from "markdown-it";
import Turndown from "turndown";

export default {
  name: "MarkdownEditor",
  components: {},
  filters: {},
  props: {},
  data: function() {
    return {
      htmlContent: "",
      mdContent: "",

      mode: "html",

      other_options: {
        menubar: false,
        images_upload_url: `/api/v1/fileupload/create`,
        images_upload_base_path: `/`,
        automatic_uploads: false,
        height: 500
      }
    };
  },
  computed: {
    ...mapState({
      inspecting: state => state.RepositoryStore.inspecting
    })
    // ...mapGetters({
    //   item: "namespace/item"
    // })
  },
  watch: {},
  async created() {
    const md = new MarkdownIt();
    this.mdContent = this.inspecting.content;
    this.htmlContent = md.render(this.inspecting.content);
  },
  async mounted() {},
  methods: {
    editorInit() {
      this.$refs.tm.editor.setContent(this.htmlContent);
    },
    toggleView() {
      if (this.mode == "html") {
        const turndownService = new Turndown();
        this.mdContent = turndownService.turndown(this.htmlContent);
        this.mode = "md";
      } else {
        const md = new MarkdownIt();
        this.htmlContent = md.render(this.mdContent);
        this.mode = "html";
      }
    }
  }
};
</script>

<style></style>
