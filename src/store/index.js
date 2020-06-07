import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";


Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    profile: {},
    blogs: [],
    activeBlog: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setAllBlogs(state, blogs) {
      state.blogs = blogs
    },
    addNewBlog(state, blog) {
      state.blogs.push(blog)
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog
    },
    addComment(state, comment) {
      state.activeBlog.comments.push(comment)
    },
    removeComment(state, id) {
      let foundCom = state.activeBlog.comments.findIndex(c => c.id == id)
      state.activeBlog.comments.splice(foundCom, 1)
    },
    changeComment(state, comment) {
      let foundCom = state.activeBlog.comments.find(c => c.id == comment.id)
      foundCom.body = comment.body
    },
    changeBlog(state, blog) {
      state.activeBlog.body = blog.body
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlogs({ commit }) {
      try {
        let res = await api.get("blogs")
        commit("setAllBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({ commit, dispatch }, blog) {
      try {
        let res = await api.post("blogs", blog)
        commit("addNewBlog", res.data)

      } catch (error) {
        console.error(error)
      }
    },
    async getActiveBlog({ commit }, id) {
      let res = await api.get("blogs/" + id)
      commit("setActiveBlog", res.data)
    },
    async deleteBlog({ commit, dispatch }, id) {
      try {
        await api.delete("blogs/" + id)
        router.push({ name: "Home" })
      } catch (error) {
        console.error(error)
      }
    },
    async addNewComment({ commit, dispatch }, comment) {
      try {
        let res = await api.post("/comments", comment)
        commit("addComment", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment({ commit, dispatch }, id) {
      try {
        await api.delete("/comments/" + id)
        commit("removeComment", id)
      } catch (error) {

      }
    },
    async editComment({ commit, dispatch }, comment) {
      try {
        let res = await api.put("/comments/" + comment.id, comment)
        commit("changeComment", comment)
      } catch (error) {
        console.error(error)
      }
    },
    async editBlog({ commit, dispatch }, blog) {
      try {
        await api.put("/blogs/" + blog.id, blog)
        commit("changeBlog", blog)
      } catch (error) {
        console.error(error)
      }
    }
  }
});
