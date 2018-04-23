<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{name}}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="formValid">
          <v-layout column>
            <v-flex
              xs12
              sm6
              md8
              text-xs-center
              layout
              align-center
              justify-center>
              <v-avatar
                :tile="tile"
                :size="avatarSize"
                class="grey lighten-4">
                <img :src="profilePic" alt="Profile pic">
              </v-avatar>
            </v-flex>
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
              <v-btn color="primary" :to="{ name: 'Media' }" outline>
                <v-icon color="primary">camera_alt</v-icon>
              </v-btn>
              <v-btn color="error" :to="{ name: 'Home' }" outline>
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
  data () {
    return {
      name: 'User Info',
      tile: false,
      avatarSize: 150,
      alert: false,
      formValid: false,
      email: this.$store.state.user.email,
      emailRules: [(r) => !!r || `E-mail is required`],
    };
  },
  created () {
    this.$store.dispatch('getPhoto');
  },
  methods: {},
  computed: {
    error () {
      return this.$store.state.error;
    },
    loading () {
      return this.$store.state.loading;
    },
    profilePic () {
      return this.$store.state.pic;
    },
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true;
      };
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null);
      };
    },
  },
}
</script>

<style scoped>
</style>
