<template>
  <div class="later-view">
    <div class="dropdown dropstart" style="position: fixed; right: 0%; top: 50%; transform: translateY(-50%); z-index: 999;">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
      </button>
      <ul class="dropdown-menu overflow-auto" aria-labelledby="dropdownMenuButton" style="max-height: 800px;">
        <li v-for="id in this.$store.state.laterview" :key="id">
          <img src="https://image.tmdb.org/t/p/original/51vreLbrGwzAg4WRCHgitWz6Naw.jpg" style="width:100px; height:100px;" class="" alt="...">
          <span>{{id}}</span>
        </li>
      </ul>
    </div>

  </div>


</template>

<script>
import axios from "axios"

export default {
  name : "LaterView",
  data() {
    return {
      title : null,
      poster_path : null,
    }
  },
  created() {
  },
  methods : {
    getImageUrl(id) {
      console.log(id)
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w300';
      axios
        .get(url)
        .then((response) => {
          this.poster_path = response.data.poster_path;
          return `${baseUrl}${size}${this.poster_path}`;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getTitle(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`
      axios
        .get(url)
        .then((response) => {
          this.title = response.data.title;
          console.log(this.title)
          return this.title;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  }
}
</script>