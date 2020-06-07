<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col text-center my-3">
        <h1 class>Welcome to Bloggr!</h1>
        <form v-if="$auth.isAuthenticated" @submit.prevent="createBlog">
          <label for="title"></label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Tite..."
            v-model="newBlog.title"
            required
          />
          <label for="body"></label>
          <input
            type="text"
            name="body"
            id="body"
            placeholder="Body..."
            v-model="newBlog.body"
            required
          />
          <button type="submit" class="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
    <div class>
      <Blogs />
    </div>
  </div>
</template>

<script>
import Blogs from "../components/BlogsComponent.vue";
export default {
  name: "home",
  mounted() {},
  data() {
    return {
      newBlog: {}
    };
  },
  computed: {},
  components: {
    Blogs
  },
  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", { ...this.newBlog });
      this.newBlog = {};
    }
  }
};
</script>
