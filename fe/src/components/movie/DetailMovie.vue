<template>
  <div>
    <!-- article은 DetailView에서 created()될 때 생김 -->
    <div>영화번호 : {{movie.id}}</div>
    <hr/>
  </div>
</template>

<script>
export default {
  props : { // 부모에게서 받아올 속성, 그 속성의 타입 명시(오류 사전 방지)
    iseUser : Boolean,
    movie : {
      id : Number,
    }
  },
}
</script>