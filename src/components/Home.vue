<template>
  <div id="home">
    <section class="hero" style="background-image: url('/static/images/messy_wars.jpg')">
      <div class="hero-body">
        <div class="container squeeze">
          <div class="title-container">
            <h1 class="title hero-title">Camp Kesem at the Claremont Colleges</h1>
          </div>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="columns">
        <div class="column is-12">
          <article class="media columns flex-me" v-for="article in articles">
            <figure class="media-left column is-full-mobile">
              <p class="image">
                <router-link :to="`/article/${article.slug}`"><img class="cover_photo" :src="article.cover_photo.url"></router-link>
              </p>
            </figure>
            <div class="media-content column is-full-mobile has-text-centered-mobile">
              <div class="content">
                <router-link :to="`/article/${article.slug}`"><h2 class="media-title">{{ article.title }}</h2></router-link>
                <p>
                  <small>Posted by {{ article.author.camp_name }}</small> <small>{{ article.date_created | moment('from', 'now') }}</small>
                  <br>
                  {{ article.blurb }}
                </p>
                <div>
                  <span class="tag is-link" v-for="tag in article.tags">{{ tag.label }}</span>
                </div>
              </div>
              <router-link :to="`/article/${article.slug}`"><button class="button is-primary">Read More</button></router-link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios'

export default {
  name: 'Home',
  data () {
    return {
      articles: []
    }
  },
  created () {
    axios.get('/api/articles/list/published')
      .then(res => {
        this.articles = res.data.results
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

.tag
  margin-right: 5px

.title-container
  +mobile
    padding: 50px 0
  +tablet
    padding: 100px 0
  +desktop
    padding: 150px 0

.hero-title
  color: white
  +mobile
    font-weight: bold
  +tablet
    font-size: 3.5rem
  +desktop
    margin-top: 2

article
  .media-title
    margin-bottom: 0.1em
</style>
