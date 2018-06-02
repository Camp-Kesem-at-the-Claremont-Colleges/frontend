<template>
  <footer class="footer is-primary">
    <div class="container">
      <div class="columns">
        <div class="column">
          <img id="footer-logo" src="/static/logo-white.png">
          <p>Camp Kesem at the Claremont Colleges provides a week long camp for children who have been affected by a parent's cancer.</p>
        </div>
        <div class="column">
          <ul>
            <li><router-link to="/">Home</router-link></li>
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
</template>

<script>
export default {
  name: 'Footer'
}
</script>
