<template>
  <v-container fluid>
    <v-layout row wrap>
      <!-- <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{ name }}</h1>
      </v-flex> -->
      <v-flex align-center>
        <v-flex>
          <v-alert type="error" dismissible v-model="alert">
            {{ error }}
          </v-alert>
        </v-flex>
        <div class="camera-modal">
          <video poster="@/assets/logo.png" ref="video" class="camera-stream"></video>
          <v-flex class="text-xs-center">
            <v-btn color="teal" :disabled="loading" @click="capture" large outline>
              <v-icon>camera_alt</v-icon>
            </v-btn>
            <v-btn color="error" :disabled="loading" :to="{ name: 'User' }" large outline>
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<script>
export default {
  mounted () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
        this.stream = mediaStream;
      })
      .catch(err => this.$store.commit('setError', err));
  },
  beforeRouteLeave (to, from, next) {
    if (from.name === 'Media') {
      this.stream.getTracks()
      .map(track => track.stop());
    };
    next();
  },
  destroyed () {
    const tracks = this.stream.getTracks();
    tracks.map(track => track.stop());
  },
  data: function () {
    return {
      alert: false,
      name: 'Media Room',
      stream: null,
    };
  },
  methods: {
    capture () {
      this.$store.dispatch('takePhoto', { stream: this.stream });
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
      };
    },
    alert(value) {
      if (!value) {
        this.$store.commit('setError', null);
      };
    },
  },
};
</script>

<style scoped>
  .camera-modal {
    width: 100%;
    height: 90vh;
  }
  .camera-stream {
    width: 100%;
    max-height: 70%;
  }

  .camera-modal video {
    object-fit: contain;
  }
</style>

