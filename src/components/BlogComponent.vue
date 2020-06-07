<template>
  <div class="col-5 text-center bg-warning my-3 box-shadow rounded">
    <router-link :to="{name:'Blog', params: {id: blog.id}}">
      <div class="border-bottom">
        <h1 class>{{blog.title}}</h1>
      </div>
      <div>
        <h5 class="text-left bg-light box-shadow">{{blog.body}}</h5>
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

  methods: {}
};
</script>

<style>
.border-bottom {
  border-bottom: 5px solid black !important;
}
</style>