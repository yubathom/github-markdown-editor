<template>
  <div class="w-100 h-screen flex">
    <div
      class="flex flex-col justify-between md:min-w-1/4 lg:min-w-1/6 bg-white shadow-lg h-100"
    >
      <div>
        <div class="p-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="state"
            >Status</label
          >
          <div class="flex">
            <select v-model="selectedRepo" id="state" class="select mr-2">
              <option
                v-for="repository in repositories"
                :key="repository.id"
                :value="repository.html_url"
                >{{ repository.name }}</option
              >
            </select>
            <AppButton
              @clicked="selectRepostory"
              :loading="loading"
              type="button"
              >Vai</AppButton
            >
          </div>
        </div>

        <div v-if="tree">
          <div
            v-if="path"
            @click.prevent="backPath()"
            class="flex items-center text-xs p-2 m-2 select-none bg-teal-100 hover:bg-teal-200 cursor-pointer rounded"
          >
            Voltar
          </div>
          <TreeEntry
            v-for="entry in visibleTree"
            :key="entry.sha"
            :entry="entry"
          ></TreeEntry>
        </div>
      </div>

      <div
        @click.prevent="reset()"
        class="p-4 text-sm border-t cursor-pointer hover:bg-gray-100"
      >
        Sair
      </div>
    </div>

    <div class="w-full h-screen">
      <pre
        v-if="inspecting && lang != 'md'"
        class="bg-gray-900 h-screen p-6 text-white overflow-auto break-all whitespace-pre"
        >{{ inspecting.content }}</pre
      >
      <MarkdownEditor v-if="inspecting && lang == 'md'" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppButton from "@/components/AppButton";
import TreeEntry from "@/components/TreeEntry";
import MarkdownEditor from "@/components/MarkdownEditor";

export default {
  name: "Home",
  components: {
    AppButton,
    TreeEntry,
    MarkdownEditor
  },
  filters: {},
  props: {},
  data: function() {
    return {
      loading: false,
      selectedRepo: ""
    };
  },
  computed: {
    ...mapState({
      repositories: state => state.RepositoryStore.repositories,
      access_code: state => state.access_code,
      tree: state => state.RepositoryStore.tree,
      path: state => state.RepositoryStore.path,
      inspecting: state => state.RepositoryStore.inspecting
    }),
    visibleTree() {
      if (this.tree) {
        if (this.path) {
          return [
            ...this.tree.filter(
              node => node.parent == this.path && node.type == "tree"
            ),
            ...this.tree.filter(
              node => node.parent == this.path && node.type == "blob"
            )
          ];
        } else {
          return [
            ...this.tree.filter(node => !node.parent && node.type == "tree"),
            ...this.tree.filter(node => !node.parent && node.type == "blob")
          ];
        }
      } else {
        return [];
      }
    },
    lang() {
      if (this.inspecting && this.inspecting.path) {
        return this.inspecting.path.split(".").pop();
      }
      return null;
    }
  },
  watch: {},
  async created() {},
  async mounted() {},
  methods: {
    backPath() {
      const backTo = this.tree.find(
        item => item.sha == this.visibleTree[0].parent
      );
      this.$store.commit(
        "RepositoryStore/SET_PATH",
        backTo.parent ? backTo.parent : null
      );
    },

    async selectRepostory() {
      if (!this.loading) {
        this.loading = true;
        const repo = this.selectedRepo.replace("https://github.com/", "");

        try {
          await this.$store.dispatch("RepositoryStore/getRepository", repo);
        } catch (err) {
          alert(
            "Ops, aconteceu um erro, verifique se seu repositório e chave de acesso são válidos."
          );
        } finally {
          this.loading = false;
        }
      }
    },

    reset() {
      this.$store.commit("CLEAR");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Code&display=swap");

pre {
  font-family: "Fira Code", monospace;
}
</style>
