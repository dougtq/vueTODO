<template>
  <v-container fluid>
    <v-layout row wrap>
      <!-- <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Media Room</h1>
      </v-flex> -->
      <v-flex align-center>
        <v-flex>
          <v-alert type="error" dismissible v-model="alert">
            {{ error }}
          </v-alert>
        </v-flex>
        <div class="camera-modal">
          <video ref="video" class="camera-stream"></video>
          <v-flex class="text-xs-center" mt-5>
            <v-btn color="teal" @click="capture" large outline>
              <v-icon color="teal">camera_alt</v-icon>
            </v-btn>
            <v-btn color="teal" large outline>
              <v-icon color="teal">close</v-icon>
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
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      })
      .catch(err => this.$store.commit('setError', err));
  },
  data: function () {
    return {
      alert: false,
    };
  },
  methods: {
    capture() {
      return null;
    },
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
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
    height: 100%;
    /* z-index: 10; */
  }
  .camera-stream {
    width: 100%;
    max-height: 100%;
  }
</style>

