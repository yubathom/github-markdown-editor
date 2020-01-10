<template>
  <div>
    <div
      @click.prevent="load()"
      class="flex items-center p-2 m-2 select-none hover:bg-gray-200 cursor-pointer rounded"
    >
      <EntryIcon :entry="entry.path" :type="entry.type" class="w-6" />
      <p class="ml-3 text-xs font-bold">{{ entry.path }}</p>
    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters  } from 'vuex';
import EntryIcon from "@/components/EntryIcon";

export default {
  name: "TreeEntry",
  components: {
    EntryIcon
  },
  filters: {},
  props: {
    entry: {
      type: Object
    }
  },
  data: function() {
    return {};
  },
  computed: {
    // ...mapState({
    //   item: state => state.namespace.item
    // }),
    // ...mapGetters({
    //   item: "namespace/item"
    // })
  },
  watch: {},
  async created() {},
  async mounted() {},
  methods: {
    async load() {
      if (this.entry.type == "tree") {
        await this.$store.dispatch(
          "RepositoryStore/getTreeContent",
          this.entry
        );
      }

      if (this.entry.type == "blob") {
        await this.$store.dispatch(
          "RepositoryStore/getBlobContent",
          this.entry
        );
      }
    }
  }
};
</script>

<style></style>
