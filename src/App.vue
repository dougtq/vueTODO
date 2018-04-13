<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" absolute>
      <v-toolbar>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{ title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0" >
        <v-list-tile exact v-for="(page, index) of routes" :key="index" :to="page.route">
          <v-list-tile-action >
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ page.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile exact @click="userSignOut" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sair</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <span>
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon> 
      </span>
      <!-- <v-spacer></v-spacer> -->
      <span class="hidden-sm-and-down">
        <v-btn class="white--text" color="error" :to="{ name: 'Index' }" depressed outline>{{ title }}</v-btn>
      </span>
    </v-toolbar>
    <v-layout>
      <v-flex>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-flex>
    </v-layout>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: this.$store.state.app,
      sidebar: false,
      routes: [{
        route: { name: 'Index' },
        name: 'Main',
        icon: 'home',
      }],
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: 'Merriweather', serif;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
