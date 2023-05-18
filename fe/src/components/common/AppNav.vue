<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg bg-primary border">
      <div class="container-fluid">
        <router-link class="navbar-brand text-light" to="/">
        임시Navbar
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link text-light" to="/">홈</router-link>
            <router-link class="nav-link text-light" to="/search">검색</router-link>
          </div>
          <div class="navbar-nav ms-auto">
            <AppLoginout/>
            <router-link class="nav-link text-light" to="/signup">회원가입</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import AppLoginout from "@/components/common/AppLoginout.vue"

export default {
  components : {
    AppLoginout
  }
}
</script>

<style>

</style>