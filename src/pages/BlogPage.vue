<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="bg-warning pb-2 box-shadow rounded">
          <div>
            <h1 class="text-center border-bottom">{{blog.title}}</h1>
          </div>
          <div class="d-flex justify-content-between">
            <h5 class="text-left ml-3 mr-4">{{blog.body}}</h5>
          </div>
          <ol>
            <comments v-for="comment in comments" :key="comment._id" :comment="comment" />
          </ol>
          <form
            v-if="$auth.isAuthenticated"
            class="d-flex flex-row-reverse mr-4"
            @submit.prevent="addNewComment"
          >
            <button type="sumbit" class="btn btn-info ml-2">Submit</button>
            <label for="comment"></label>
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add New Comment.."
              v-model="newComment.body"
              class="form-control ml-3"
            />
          </form>
          <div class="d-flex flex-row-reverse mr-3">
            <button class="btn btn-danger m-2" @click="deleteBlog" v-if="isCreator">Delete Blog</button>
            <button class="btn btn-info m-2" @click="enableEdit = true" v-if="isCreator">Edit Blog</button>
          </div>
          <form @submit.prevent="editBlog" v-if="enableEdit" class="d-flex flex-row mx-3">
            <input class="form-control" type="text" name="body" id="body" />
            <button type="sumbit" class="btn btn-info mx-2">Sumbit</button>
            <button @click="enableEdit = false" class="btn btn-danger mx-2">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "../components/CommentsComponent.vue";
import { api } from "../store/AxiosStore";
import swal from "sweetalert";

export default {
  name: "ActiveBlog",
  data() {
    return {
      newComment: {
        blogId: this.$route.params.id
      },
      enableEdit: false,
      //BROKEN
      change: {
        // body: this.$store.state.activeBlog.blog.body
      }
    };
  },
  mounted() {
    this.$store.dispatch("getActiveBlog", this.$route.params.id);
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog.blog;
    },
    comments() {
      return this.$store.state.activeBlog.comments;
    },
    isCreator() {
      return (
        this.$store.state.profile.email ==
        this.$store.state.activeBlog.blog.creatorEmail
      );
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    deleteBlog() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this blog!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.del();
          swal("Poof! Your blog has been deleted!", {
            icon: "success"
          });
        } else {
          swal("Your blog is safe!");
        }
      });
    },
    del() {
      this.$store.dispatch("deleteBlog", this.$route.params.id);
      try {
      } catch (error) {
        console.error(error);
      }
    },
    editBlog() {
      this.$store.dispatch("editBlog", this.change);
      this.blogEdit = false;
    },
    addNewComment() {
      try {
        this.$store.dispatch("addNewComment", { ...this.newComment });
        this.newComment = { blogId: this.$route.params.id };
      } catch (error) {
        console.error(error);
      }
    },
    async getComments() {
      try {
        let res = api.get("blogs/" + this.$route.params.id);
      } catch (error) {
        console.error(error);
      }
    }
  },
  components: {
    Comments
  }
};
</script>
<style scoped>
.flex-row-reverse {
  flex-direction: row-reverse;
}
.width-100 {
  width: 100%;
}
</style>