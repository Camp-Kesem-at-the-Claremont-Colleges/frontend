<template>
  <footer class="footer is-primary">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <img id="footer-logo" src="/static/logo-white.png">
          <p>Camp Kesem at the Claremont Colleges provides a week long camp for children who have been affected by a parent's cancer.</p>
        </div>
        <div class="column is-3">
          <h1 class="footer-title">Links</h1>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li v-if="!$store.getters.isAuthenticated"><router-link to="/login">Login</router-link></li>
            <li v-if="$store.getters.isAuthenticated"><a href="/logout" @click.prevent="logout">Logout</a></li>
          </ul>
        </div>
        <div class="column is-3">
          <h1 class="footer-title">Newsletters</h1>
          <ul>
            <li v-for="slug in slugs" :key="slug.slug"><router-link :to="`/article/${slug.slug}`">{{ slug.title }}</router-link></li>
          </ul>
        </div>
        <div class="column is-2 has-text-right">
          <a target="_blank" class="icon" href="https://www.facebook.com/campkesemclaremont/"><i class="fa fa-facebook"></i></a>
          <a target="_blank" class="icon" href="https://www.instagram.com/campkesemclaremont/"><i class="fa fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Footer',
  data () {
    return {
      slugs: []
    }
  },
  methods: {
    getArticles () {
      axios.get('/api/articles/list/slugs/')
        .then(res => {
          this.slugs = res.data.results
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style lang="sass" scoped>
.footer-title
  font-size: 1.5em
</style>

