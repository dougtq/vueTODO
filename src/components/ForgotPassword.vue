<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{ name }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="formValid" @submit.prevent="resetPassword">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-alert type="primary" dismissible v-model="message">
                Tell us your e-mail and check your inbox after some minutes to reset your password!
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
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="success" outline type="submit" :disabled="!formValid || loading">
                <v-icon color="success">check</v-icon>
              </v-btn>
              <v-btn color="error" outline :to="{ name: 'Index' }" :disabled="loading">
                <v-icon color="error">close</v-icon>
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
  data: function () {
    return {
      name: 'Reset Account',
      alert: false,
      message: true,
      formValid: false,
      email: '',
      emailRules: [(r) => !!r || 'E-mail is required', r => !!r && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(r) || 'E-mail must be valid'],
    }
  },
  methods: {
    resetPassword() {
      this.$store.dispatch('resetPassword', { email: this.email })
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