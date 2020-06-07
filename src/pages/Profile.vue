<template>
  <div class="about container-fluid">
    <div class="row">
      <div class="col">
        <h4>Welcome {{ profile.name }}</h4>
        <img class="rounded justify-content-center" :src="profile.picture" alt />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div>
      <Blogs />
    </div>
  </div>
</template>

<script>
import Blogs from "../components/ProfileBlogsComponent.vue";
export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("getProfile");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  components: {
    Blogs
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
