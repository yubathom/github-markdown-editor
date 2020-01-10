<template>
  <div>
    <BlobIcon v-if="type == 'blob'" />
    <TreeIcon v-if="type == 'tree'" />
  </div>
</template>

<script>
//import { mapState, mapGetters  } from 'vuex';

import BlobIcon from "@/components/Icons/BlobIcon";
import TreeIcon from "@/components/Icons/TreeIcon";

export default {
  name: "EntryIcon",
  components: {
    BlobIcon,
    TreeIcon
  },
  filters: {},
  props: {
    entry: {
      type: String
    },
    type: {
      type: String
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
  methods: {}
};
</script>

<style></style>
