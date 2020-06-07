<template>
  <div class="row justify-content-between">
    <Blog v-for="blog in blogs" :key="blog._id" :blog="blog" />
  </div>
</template>

<script>
import Blog from "./ProfileBlogComponent.vue";

export default {
  name: "Blogs",
  // NOTE mounted fires at the first startup of the template being added to the page
  mounted() {
    this.$store.dispatch("getAllBlogs");
  },
  data() {
    return {};
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    }
  },
  methods: {},
  components: {
    Blog
  }
};
</script>

<style>
</style>