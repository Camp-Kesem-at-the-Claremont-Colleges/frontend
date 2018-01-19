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
          <div class="column is-10 is-offset-1 ql-container ql-snow">
            <div class="ql-editor" v-html="article.content"></div>
          </div>
        </div>
        <div class="has-text-centered">
          <div>
            Posted by {{ article.author.camp_name }}
          </div>
          <span class="image is-128x128 inline-me">
            <img class="profile-picture" :src="article.author.avatar">
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import '../../node_modules/quill/dist/quill.core.css'
import '../../node_modules/quill/dist/quill.snow.css'
import '../../node_modules/quill/dist/quill.bubble.css'

import axios from '../axios'
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
@import '../mq'

.hero
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  background-color: #808080

.hero-body
  text-align: center

.squeeze
  width: 50%

.ql-container.ql-snow
  border: none

.title-container
  +mobile
    padding: 50px 0
  +tablet
    padding: 100px 0
  +desktop
    padding: 150px 0
  h2
    line-height: 1.5rem
  h1
    margin-bottom: 15px

span.hero-subtitle
  color: white
  background: $primaryTransparent
  +mobile
    font-weight: bold
  +tablet
    font-size: 1.5rem
  +desktop
    margin-top: 2

span.hero-title
  background: $primaryTransparent
  color: white
  +mobile
    font-weight: bold
  +tablet
    font-size: 3.5rem
  +desktop
    margin-top: 2

span.inline-me
  display: inline-block

img.profile-picture
  border-radius: 100%
  border: 5px solid $primary
</style>
