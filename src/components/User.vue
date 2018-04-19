<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{name}}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="formValid">
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
                disabled
                v-model="email"
                :rules="emailRules"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="warning" :to="{ name: 'Home' }" outline :disabled="loading">Cancel</v-btn>
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
      name: 'User Info',
      alert: false,
      formValid: false,
      email: this.$store.state.user.email,
      emailRules: [(r) => !!r || `E-mail is required`],
    };
  },
  methods: {},
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
    },
  },
}
</script>