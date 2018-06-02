<template>
  <section>
    <h1>Comments</h1>
    <div class="card" v-for="(comment, i) in comments" :key="i">
      <header class="card-header">
        <figure class="image is-64x64">
          <img class="avatar" :src="comment.posted_by.avatar" v-if="comment.posted_by.avatar">
          <img class="avatar" src="/static/logo-square.jpg" v-if="!comment.posted_by.avatar">
        </figure>
        <p class="card-header-title">
          {{ comment.posted_by.camp_name }}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <button class="button">Resolved</button>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          {{ comment.comment }}
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-10">
        <input class="input" type="text" placeholder="New comment" v-model="newComment">
      </div>
      <div class="column is-1">
        <button class="button is-primary" @click.prevent="addComment">Add Comment</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '../../axios'
export default {
  name: 'Comments',
  props: ['id'],
  data () {
    return {
      comments: [],
      newComment: null
    }
  },
  watch: {
    id (newId, oldId) {
      this.getComments()
    }
  },
  methods: {
    getComments () {
      axios.get(`/api/comments/?search=${this.id}`)
      .then(res => {
        this.comments = res.data.results
      })
    },
    addComment () {
      const form = {
        comment: this.newComment,
        article_id: this.id
      }
      axios.post('/api/comments/', form, this.$store.getters.authorizationHeader)
        .then(res => {
          this.getComments()
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: `Error`,
            text: err.response.data.detail
          })
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.card
  margin-bottom: 1em


</style>
