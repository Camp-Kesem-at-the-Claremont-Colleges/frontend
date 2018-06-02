<template>
  <div id="login">
    <div class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <form>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" type="text" placeholder="Username" v-model="credentials.username">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="credentials.password">
              </div>
            </div>
            <button class="button is-primary" @click.prevent="onSubmit">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', {
        username: this.credentials.username,
        password: this.credentials.password
      })
    }
  }
}
</script>

<style lang="sass">
@import '../mq'
</style>
