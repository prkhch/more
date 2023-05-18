<template>
  <div class="detail-view">
    <!-- <AppLoading v-if="isLoading"/> -->
    <!-- <div v-else> -->
      <h1>DetailView</h1>
      <DetailMovie 
        :movie="movie"
        :isUser = "isUser" />
      <DetailComments :comments="movie.comments" />
      <CommentInput @createComment="createComment"/>
      <DetailRecommand/>
    <!-- </div> -->
    
  </div>
</template>

<script>
import axios from "axios"
// import AppLoading from "@/components/common/AppLoading.vue" // 로딩
import DetailMovie from "@/components/movie/DetailMovie.vue" // 게시글
import DetailComments from "@/components/movie/DetailComments.vue" // 게시글
import CommentInput from "@/components/movie/CommentInput.vue" // 댓글 입력창

export default {
  components : {
    // AppLoading,
    DetailMovie,
    DetailComments,
    CommentInput,
  },
  data() { // 데이터 초기 상태
    return {
      isLoading : true, // 로딩중
      isUser : false, // 작성자 : 없음
      arrowBackRouteName : "board", // 뒤로가기는 게시판으로 이동
      article : {}, // 게시글은 빈 상태
    }
  },
  created() { // 인스턴스 생성되었을 때
    axios
      .get( // get(백엔드API, 토큰)
        // 라우트 매개변수 id를 사용하여 백엔드 API호출
        `${this.$store.state.URL}/api/v1/movies/${this.$route.params.id}/`,
        {
          headers: {
            Authorization : `Token ${this.$store.state.key}`,
          },
        }
      )
      .then((response) => { // 응답
        if(response.status === 200) { 
          this.movie = response.data; // 응답데이터=>게시글
          if(this.movie.user.username === this.$store.state.username) { // 게시글 작성자 === 현재 유저
            this.isUser = true; // 작성자 확인 true
          }
          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.error(error);
        if(error.response.status === 401) {
          alert("로그인 후 이용하세요.")
          this.$router.push({name:"home"})
        }
      })
  },
  methods : {
    getAllData() { // 게시글 모든 데이터
      axios
        .get(
          `${this.$store.state.URL}/api/v1/movies/${this.$route.params.id}/`,
          {
            headers : {
              Authorization : `Token ${this.$store.state.key}`,
            }
          }
        )
        .then((response) => {
          if(response.status === 200) {
            this.movie = response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        })
    },
    createComment(content) { // 댓글 작성
      axios
        .post(
          `${this.$store.state.URL}/api/v1/movies/${this.$route.params.id}/comments/`,
          {content : content},
          {headers : {Authorization: `Token ${this.$store.state.key}`}}
        )
        .then((response) => {
          this.content="";
          if(response.status===201) {
            this.getAllData();
          }
        })
        .catch((error) => {
          console.error(error);
        })
    },
    // deleteArticle() { // 게시글 삭제
    //   axios
    //     .delete(
    //       `${this.$store.state.URL}/api/v1/articles/${this.$route.params.id}/`,
    //       {headers: {Authorization:`Token ${this.$store.state.key}`}}
    //     )
    //     .then((response) => {
    //       if(response.status === 204) {
    //         alert("글 삭제 성공")
    //         this.$router.push({name:"board"}); 
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // },
    deleteComment(id) { // 댓글 삭제
      axios
        .delete(
          `${this.$store.state.URL}/api/v1/comments/${id}/`, 
          {headers : {Authorization : `Token ${this.$store.state.key}`}}
          )
        .then((response) => { 
          if(response.status === 204) {
            this.getAllData();
          }
        })
        .catch((error) => console.error(error))
    }
  }
}
</script>