<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{title}}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="formValid" @submit.prevent="createUser">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="E-mail"
                id="email"
                type="email"
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
            <v-flex>
              <v-text-field
                name="passwordConfirmation"
                label="Password Confirmation"
                id="passwordConfirmation"
                type="password"
                v-model="passwordConfirmation"
                :rules="passwordConfirmationRules"
                required></v-text-field>
            </v-flex>            
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" outline type="submit" :disabled="!formValid || loading">Create</v-btn>
              <v-btn color="error" :to="{ name: 'Index' }" outline :disabled="loading">Cancel</v-btn>
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
      title: 'Create Account',
      alert: false,
      formValid: false,
      email: '',
      emailRules: [(r) => !!r || 'E-mail is required', r => !!r && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(r) || 'E-mail must be valid'],
      password: '',
      passwordRules: [(r) => !!r || `Password is required`, r => r.length > 5 || 'Password got to have at least 6 characters'],
      passwordConfirmation: '',
      passwordConfirmationRules: [(r) => !!r || `Password is required`, (r) => (!!r && r === this.password || `The passwords don't match`)],
    }
  },
  methods: {
    createUser() {
      if ((this.password) && (this.password === this.passwordConfirmation)) {
        this.$store.dispatch('createUser', { email: this.email, password: this.password })
      }
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