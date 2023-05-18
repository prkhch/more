<template>
    <div class="search-view">
        <h1>SearchView</h1>
        <SearchInput/>
        <AppLoading/>
    </div>
</template>

<script>
import SearchInput from "@/components/search/SearchInput.vue"
import AppLoading from "@/components/common/AppLoading.vue"

export default {
  components : {
    SearchInput,
    AppLoading
  },
};
</script>