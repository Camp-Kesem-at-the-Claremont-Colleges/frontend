<template>
  <div id="app">
    <notifications position="bottom center" group="admin"/>
    <notifications position="bottom center" classes="notification-error" group="error"/>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="/static/logo.png" id="logo" height="200">
        </a>
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
            <router-link class="navbar-link" to="/newsletters">
              Newsletters
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link class="navbar-item" to="/">
                Announcements
              </router-link>
              <router-link class="navbar-item" to="/">
                Columns
              </router-link>
              <router-link class="navbar-item" to="/">
                Layout
              </router-link>
              <router-link class="navbar-item" to="/">
                Form
              </router-link>
              <hr class="navbar-divider">
              <router-link class="navbar-item" to="/">
                Elements
              </router-link>
              <router-link class="navbar-item is-active" to="/">
                Components
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
    <div class="contents">
      <router-view/>
    </div>
    <footer class="footer is-primary">
      <div class="container">
        <div class="columns">
          <div class="column">
            <img id="footer-logo" src="/static/logo-white.png">
            <p>And this right here is a spiffy footer, where you can put stuff.</p>
          </div>
          <div class="column">
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/newsletters">Newsletters</router-link></li>
              <li v-if="!$store.getters.isAuthenticated"><router-link to="/login">Login</router-link></li>
              <li v-if="$store.getters.isAuthenticated"><a href="/logout" @click.prevent="logout">Logout</a></li>
            </ul>
          </div>
          <div class="column has-text-right">
            <a target="_blank" class="icon" href="https://www.facebook.com/campkesemclaremont/"><i class="fa fa-facebook"></i></a>
            <a target="_blank" class="icon" href="https://www.instagram.com/campkesemclaremont/"><i class="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      burger: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style lang="sass">
@import 'mq'
@import '../node_modules/bulma/bulma.sass'

h1
  font-size: 2.5rem
h2
  font-size: 2rem
h3
  font-size: 1.5rem

#app
  display: flex
  min-height: 100vh
  flex-direction: column

.contents
  flex: 1

.navbar
  background-color: black
  .navbar-item, .navbar-link
    color: $primary
  .navbar-item img#logo
    max-height: 2.5rem

.navbar-brand
  a.navbar-item
    &:hover
      background-color: black

footer.footer
  background-color: $primary !important
  color: #fff

  #footer-logo
    height: 150px
  .icon
    color: #fff
    margin-left: 20px
  li a
    color: white

.notification
  background-color: $secondary

.notification-error
  background-color: $danger
  color: white
</style>
