<template>
  <div v-if="isCreator" class="col-5 text-center bg-warning my-3 box-shadow">
    <router-link :to="{name:'Blog', params: {id: blog.id}}">
      <div class="border-bottom">
        <h1>{{blog.title}}</h1>
      </div>
      <div>
        <h5 class="text-left bg-light">{{blog.body}}</h5>
      </div>
      <div class="text-left">Author: {{blog.creator.name}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Blog",
  props: ["blog"],
  mounted() {},
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.blog.creatorEmail;
    }
  },
  methods: {}
};
</script>

<style>
.border-bottom {
  border-bottom: 5px solid black !important;
}
</style>