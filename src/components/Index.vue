<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{name}}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="formValid" @submit.prevent="signIn">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                autofocus
                name="email"
                label="E-mail"
                id="email"
                type="email"
                autocomplete="off"
                v-model="email"
                :rules="emailRules"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="indigo lighten-2" :disabled="loading" :to="{ name: 'CreateUser' }" outline>
                <v-icon large color="indigo lighten-2">person_add</v-icon>
              </v-btn>              
              <v-btn color="primary" type="submit" :disabled="!formValid || loading" outline>
                <v-icon large color="primary">send</v-icon>
              </v-btn>
              <v-btn color="error" :disabled="loading" :to="{ name: 'ResetPassword' }" outline>
                <v-icon large color="error">report</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12 class="text-xs-center" mt-5>
              <v-btn color="grey" :disabled="loading" @click="signInGithub" large outline>
                <v-icon color="black" large>fab fa-github</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12 class="text-xs-center" v-if="loading" mt-5>
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'Log In',
      alert: false,
      formValid: false,
      email: '',
      emailRules: [r => !!r || 'E-mail is required', r => !!r && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(r) || 'E-mail must be valid'],
      password: '',
      passwordRules: [r => !!r || 'Password is required'],
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
    },
    signInGithub() {
      this.$store.dispatch('userSignInWithGithub');
    },
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit('setError', null);
      }
    },
  },
};
</script>