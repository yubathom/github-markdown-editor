<template>
  <div class="flex items-center justify-center w-100 h-screen">
    <div class="bg-white rounded shadow-lg p-4 w-128">
      <h1 class="text-3xl mt-2 mb-4">Repositório e acesso</h1>
      <p>
        Insira abaixo os dados do repositório público que deseja acessar, e
        também uma chave de acesso que tenha acesso aos repositórios públicos.
      </p>

      <form @submit.prevent="handleForm()" class="w-full mt-6">
        <div class="mb-4">
          <label class="label" for="repository">Respositório</label>
          <input
            v-model="repository"
            type="text"
            id="repository"
            class="input"
          />
        </div>

        <div class="mb-4">
          <label class="label" for="access_key">Chave de acesso</label>
          <input
            v-model="access_key"
            type="text"
            id="access_key"
            class="input"
          />
        </div>

        <AppButton :loading="loading" type="submit">Acessar</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters  } from 'vuex';
import AppButton from "@/components/AppButton";

export default {
  name: "",
  components: {
    AppButton
  },
  filters: {},
  props: {},
  data: function() {
    return {
      repository: "",
      access_key: "",
      loading: false
    };
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
    async handleForm() {
      // previne do form ser processado de novo caso o botão seja pressionado duas vezes
      if (!this.loading) {
        this.loading = true;
      }
    }
  }
};
</script>

<style></style>
