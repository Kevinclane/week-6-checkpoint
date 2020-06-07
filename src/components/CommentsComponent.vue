<template>
  <div class="my-3 mr-4">
    <li class="d-flex justify-content-between pl-3 bg-cstm box-shadow">
      - {{comment.body}}
      <div>
        <button v-if="isCreator" @click="activeComment = comment.id" class="btn btn-info mr-1">Edit</button>
        <button class="btn btn-danger" @click="deleteComment" v-if="isCreator">Delete</button>
      </div>
    </li>
    <form v-if="activeComment == comment.id" @submit.prevent="editComment" class="d-flex mt-1">
      <input v-model="editedComment.body" type="text" name="body" id="body" class="form-control" />
      <button type="submit" class="btn btn-info mr-1">Submit</button>
      <button @click="activeComment = ''" class="btn btn-danger">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Comments",
  props: ["comment"],
  data() {
    return {
      activeComment: "",
      editedComment: {
        body: this.comment.body,
        id: this.comment.id,
        blogId: this.comment.blogId
      }
    };
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.comment.creatorEmail;
    },
    toggle() {
      false;
    }
  },
  methods: {
    deleteComment() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.del();
          swal("Poof! Your comment has been deleted!", {
            icon: "success"
          });
        } else {
          swal("Your comment is safe!");
        }
      });
    },
    del() {
      try {
        this.$store.dispatch("deleteComment", this.comment.id);
      } catch (error) {
        console.error(error);
      }
    },
    editComment() {
      try {
        this.$store.dispatch("editComment", this.editedComment);
        this.activeComment = "";
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.bg-cstm {
  background-color: rgba(175, 197, 190, 0.37);
}
</style>