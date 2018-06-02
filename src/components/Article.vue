<template>
  <transition name="blink">
    <div id="article" v-if="article">
      <section class="hero" :style="getBackgroundImage">
        <div class="hero-body">
          <div class="container squeeze">
            <div class="title-container">
              <h1><span class="title hero-title">{{ article.title }}</span></h1>
              <h2><span class="subtitle hero-subtitle">{{ article.blurb }}</span></h2>
            </div>
          </div>
        </div>
      </section>
      <div class="section">
        <div class="columns">
          <div id="article-content" class="column is-10 is-offset-1 ql-container ql-snow">
            <div class="ql-editor" v-html="article.content"></div>
          </div>
        </div>
        <hr>
        <div class="has-text-centered">
          <div>
            Posted by {{ article.author.camp_name }}
          </div>
          <span class="inline-me" v-if="article.author.avatar">
            <img class="image profile-picture" :src="article.author.avatar">
            <p class="subtitle">{{ article.author.bio }}</p>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Article',
  data () {
    return {
      article: null
    }
  },
  computed: {
    getBackgroundImage () {
      if (this.article.cover_photo) {
        return `background-image: url('${this.article.cover_photo.url}')`
      }
      return ''
    }
  },
  created () {
    axios.get(`/api/articles/${this.$route.params.slug}/`, this.$store.getters.authorizationHeader)
      .then(res => {
        this.article = res.data
      })
      .catch(err => console.log(err))
  }
}
</script>

<style lang="sass">
@import '../ql'

#article-content
  border: none

span.inline-me
  display: inline-block

.profile-picture
  border-radius: 100%
  border: 5px solid $primary
  max-height: 250px
  margin-bottom: 1rem
  display: inline
</style>

