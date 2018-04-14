<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Log In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="formValid" @submit.prevent="userSignIn">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="id"
                label="Id"
                id="id"
                type="text"
                v-model="user._id"
                disabled
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                type="text"
                v-model="user.name"
                :rules="nameRules"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="E-mail"
                id="email"
                type="email"
                v-model="user.email"
                :rules="emailRules"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="createdAt"
                label="Created At"
                id="createdAt"
                type="text"
                disabled
                v-model="user.createdAt">
              </v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" outline type="submit" :disabled="!formValid || loading">Update</v-btn>
              <v-btn color="warning" outline :disabled="loading">Cancel</v-btn>
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
  data () {
    return {
      alert: false,
      formValid: false,
      user: this.$store.state.user,
      emailRules: [(r) => !!r || `E-mail é obrigatório`],
      nameRules: [(r) => !!r || `Senha é obrigatória`],
    }
  },
  methods: {
    userUpdate () {
      // this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>