<template>
  <div class="later-view">
    <h1 >LaterView.vue</h1>
    <h1><li v-for="id in result" :key="id">{{id}}</li></h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name : "LaterView",
  data() {
    return {
      result : [],

    }
  },
  created() {
    const username = this.$route.params.username;
    this.fetchLater(username);
  },
  methods : {
    fetchLater(username) {
      axios
        .get(`${this.$store.state.URL}/api/v1/movies/watchlater/${username}/`)
        .then((response) => {
          this.result = response.data.result;
          console.log(this.result)
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }
}
</script>