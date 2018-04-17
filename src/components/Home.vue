<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-4>
        <h1>{{name}}</h1>
      </v-flex>
      <v-jumbotron>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex class="text-xs-center">
              <h3 class="display-2">To-Do App</h3>
              <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum.</span>
              <v-divider class="my-3"></v-divider>
              <v-btn :to="{ name: 'User' }" color="purple" class="mx-0" large outline>User Info</v-btn>
              <v-btn :to="{ name: 'ToDo' }" color="indigo" class="mx-0" large outline>To Do List</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'Home'
    }
  },
}
</script>
