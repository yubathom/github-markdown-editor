<template>
  <div class="flex items-center justify-center w-100 h-screen">
    <div class="bg-white rounded shadow-lg p-4 w-128">
      <h1 class="text-2xl mt-2 mb-4">Acesso a conteúdo do Github</h1>
      <p class="mb-5">Clique para realizar sua autentiação no github</p>

      <AppButton
        :loading="loading"
        @clicked="requestGithubAccess()"
        type="button"
        >Acessar com Github</AppButton
      >

      <!-- <form @submit.prevent="handleForm()" class="w-full mt-6">
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
      </form> -->
    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters  } from 'vuex';

import AppButton from "@/components/AppButton";
import firebase from "@/services/firebase";

export default {
  name: "LoginRepository",
  components: {
    AppButton
  },
  filters: {},
  props: {},
  data: function() {
    return {
      repository: "https://github.com/educkf/simple-vue-sfc",
      access_key: "-",
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
  async created() {
    this.$store.commit("RepositoryStore/CLEAR");
  },
  async mounted() {},
  methods: {
    async requestGithubAccess() {
      try {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(async result => {
            var token = result.credential.accessToken;
            var user = result.user;

            this.$store.commit("SET_TOKEN", token);
            localStorage.setItem("token", token);

            this.$store.commit("SET_USER", user);
            localStorage.setItem("user", JSON.stringify(user));

            await this.$store.dispatch("RepositoryStore/getRepositories");

            this.$router.push("/home");
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            console.log(error);
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);

            alert(
              "Aconteceu um problema, veja os erros no console do browser."
            );
          });
      } catch (err) {
        // console.log(err);
        console.log(err);
      }
    },
    async handleForm() {
      // previne do form ser processado de novo caso o botão seja pressionado duas vezes
      if (!this.loading) {
        this.loading = true;
        const repo = this.repository.replace("https://github.com/", "");

        try {
          const response = await this.$store.dispatch(
            "RepositoryStore/getRepository",
            repo
          );
          if (response) {
            this.$store.commit("SET_ACCESS_TOKEN", this.access_key);
            this.$router.push("/home");
          } else {
            alert(
              "Ops, aconteceu um erro, verifique se seu repositório e chave de acesso são válidos."
            );
          }
        } catch (err) {
          alert(
            "Ops, aconteceu um erro, verifique se seu repositório e chave de acesso são válidos."
          );
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style></style>
