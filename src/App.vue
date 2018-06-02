<template>
  <div id="app">
    <notifications position="bottom center" group="admin"/>
    <notifications position="bottom center" classes="notification-error" group="error"/>
    <ck-nav></ck-nav>
    <div class="contents">
      <router-view/>
    </div>
    <ck-footer></ck-footer>
  </div>
</template>

<script>
import Footer from '@/components/navigation/Footer.vue'
import Navigation from '@/components/navigation/Navigation.vue'

export default {
  name: 'app',
  components: {
    'ck-footer': Footer,
    'ck-nav': Navigation
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
