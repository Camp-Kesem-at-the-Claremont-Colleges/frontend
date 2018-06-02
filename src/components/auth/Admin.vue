<template>
  <div id="admin">
    <nav class="navbar is-light has-shadow">
      <div class="navbar-tabs is-hidden-desktop">
        <router-link class="navbar-item is-tab" to="/admin">Dashboard</router-link>
        <router-link class="navbar-item is-tab" to="/admin/new-post">New Post</router-link>
        <router-link class="navbar-item is-tab" v-if="is_staff" to="/admin/users">Manage Users</router-link>
        <router-link class="navbar-item is-tab" to="/admin/profile">Profile</router-link>
        <a class="navbar-item is-tab">Logout</a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/admin">
            Dashboard
          </router-link>
          <router-link class="navbar-item" to="/admin/new-post">
            New Post
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ $store.state.campName }}
            </a>
            <div class="navbar-dropdown is-boxed">
              <router-link v-if="is_staff" class="navbar-item" to="/admin/users">
                Manage Users
              </router-link>
              <router-link class="navbar-item" to="/admin/profile">
                Profile
              </router-link>
              <a class="navbar-item" href="/logout" @click.prevent="logout">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from '@/axios'
export default {
  name: 'Admin',
  data () {
    return {
      is_staff: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.isAuthenticated) {
        next()
      } else {
        next('/login')
      }
    })
  },
  created () {
    axios.get(`/api/profile/${this.$store.state.id}/`, this.$store.getters.authorizationHeader)
      .then(res => {
        this.is_staff = res.data.is_staff
      })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
