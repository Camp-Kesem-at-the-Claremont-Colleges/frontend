<template>
  <div id="app">
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

      <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{'is-active' : burger}">
        <div class="navbar-start">
          <a class="navbar-item" href="https://bulma.io/">
            Home
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="/documentation/overview/start/">
              Newsletters
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="/documentation/overview/start/">
                Announcements
              </a>
              <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                Columns
              </a>
              <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                Layout
              </a>
              <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                Form
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                Elements
              </a>
              <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                Components
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button">
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
          <img id="footer-logo" src="/static/logo-white.png">
          <p>And this right here is a spiffy footer, where you can put stuff.</p>
        </div>
        <div class="column has-text-right">
          <a class="icon" href="#"><i class="fa fa-facebook"></i></a>
          <a class="icon" href="#"><i class="fa fa-twitter"></i></a>
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
  }
}
</script>

<style lang="sass">
@import 'mq'
@import '../node_modules/bulma/bulma.sass'

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

footer
  background-color: $primary !important
  color: #fff

  #footer-logo
    height: 150px
  .icon
    color: #fff
    margin-left: 20px
</style>
