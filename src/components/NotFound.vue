<template>
  <v-container fluid>
    <v-jumbotron :src="errorSrc">
      <h1 class="display-1 top-title">Sorry!</h1>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex class="text-xs-center">
            <!-- <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span> -->
            <!-- <div class="title mb-3">Go to the initial page of our app!</div> -->
            <!-- <v-divider class="my-3"></v-divider> -->
            <v-btn large outline color="primary" :to="{ name: 'Index' }" class="mx-0">
              <v-icon color="black">undo</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      errorSrc: 'https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/404-error.png',
    };
  }
}
</script>

<style scoped>
  .top-title {
    text-align: center;
    padding-top: 60px;
  }
</style>
