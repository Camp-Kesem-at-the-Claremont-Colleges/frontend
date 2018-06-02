<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/static/logo.png" id="logo" height="200">
      </router-link>
      <div class="navbar-burger burger" @click="burger = !burger" v-bind:class="{'is-active' : burger}">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" v-bind:class="{'is-active' : burger}">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">
          Home
        </router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Newsletters
          </a>
          <div class="navbar-dropdown is-boxed">
            <router-link v-for="slug in slugs" :key="slug.slug" class="navbar-item" :to="`/article/${slug.slug}`">
              {{ slug.title }}
            </router-link>
          </div>
        </div>
        <router-link class="navbar-item" to="/admin" v-if="$store.getters.isAuthenticated">
          Admin
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a target="_blank" href="https://donate.kesem.org/campaign/friends-of-camp-kesem-at-the-claremont-colleges-fy-2018/c142249" class="button">
                <span class="icon">
                  <i class="fa fa-gift"></i>
                </span>
                <span>
                  Donate!
                </span>
              </a>
            </p>
            <p class="control">
              <a class="button is-primary">
                <span class="icon">
                  <i class="fa fa-plus"></i>
                </span>
                <span>Register</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Navigation',
  data () {
    return {
      burger: false,
      slugs: []
    }
  },
  methods: {
    getArticles () {
      axios.get('/api/articles/list/slugs')
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
