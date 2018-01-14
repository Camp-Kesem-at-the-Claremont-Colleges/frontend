<template>
  <div id="home">
    <section class="hero" style="background-image: url('/static/images/messy_wars.jpg')">
      <div class="hero-body">
        <div class="container">
          <div class="title-container">
            <h1 class="title">Camp Kesem at the Claremont Colleges</h1>
          </div>
        </div>
      </div>
    </section>
    <h1>Newsletters</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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

.title-container
  +mobile
    padding: 50px 0
  +tablet
    padding: 100px 0
  +desktop
    padding: 150px 0

.title
  color: white
  +mobile
    font-weight: bold
  +tablet
    font-size: 1.5rem
  +desktop
    font-size: 2rem
    margin-top: 2
</style>
