<template>
  <div class="flex items-center justify-center w-100 h-screen">
    <div class="bg-white rounded shadow-lg p-4 w-128">
      <h1 class="text-2xl mt-2 mb-4 font-bold">
        Acesso a conteúdo do Github
      </h1>
      <p class="mb-5">Clique para realizar sua autentiação no github</p>

      <AppButton
        :loading="loading"
        @clicked="requestGithubAccess()"
        type="button"
        >Acessar com Github</AppButton
      >
    </div>
  </div>
</template>

<script>
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
      loading: false
    };
  },
  computed: {},
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
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
