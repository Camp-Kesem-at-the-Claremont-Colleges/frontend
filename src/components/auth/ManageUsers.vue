<template>
  <div id="manage-users">
    <div class="section">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <h1>Create New Account</h1>
          <form>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Username" v-model="user.username">
                <span class="icon is-small is-left">
                  <i class="fa fa-user-secret"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <div class="columns">
                <div class="column is-6">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="First Name" v-model="user.first_name">
                    <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                    </span>
                  </p>
                </div>
                <div class="column is-6">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Last Name" v-model="user.last_name">
                    <span class="icon is-small is-left">
                      <i class="fa fa-user-o"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Camp Name" v-model="user.camp_name">
                <span class="icon is-small is-left">
                  <i class="fa fa-free-code-camp"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <v-select
                v-model="user.role"
                :options="tags"
                placeholder="What is this person's role?"></v-select>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="user.password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <button type="submit" class="button is-primary" @click.prevent="addUser">Add User</button>
          </form>
        </div>
      </div>
      <div class="columns flex-me">
        <div class="column is-6" v-for="user in users">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img class="avatar" :src="user.avatar" v-if="user.avatar">
                    <img class="avatar" src="/static/logo-square.jpg" v-if="!user.avatar">
                  </figure>
                </div>
                <div class="">
                  <p class="title is-4">{{ user.camp_name }}</p>
                  <p class="subtitle is-6">{{ user.first_name }} {{ user.last_name }}</p>
                </div>
              </div>

              <div class="content">
                {{ user.bio }}
                <br>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import vSelect from 'vue-select'

export default {
  name: 'ManageUsers',
  components: {
    vSelect
  },
  data () {
    return {
      user: {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        camp_name: null,
        role: null
      },
      users: [],
      tags: [
        'Alumni, Marketing, & PR',
        'Director',
        'Development',
        'Program Director',
        'Outreach',
        'Volunteer',
        'Counselor',
        'Operations',
        'Make the Magic'
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      axios.get(`/api/profile/${vm.$store.state.id}/`, vm.$store.getters.authorizationHeader)
      .then(res => {
        if (res.data.is_staff) {
          next()
        } else {
          next(false)
        }
      })
      .catch(error => console.log(error))
      next(false)
    })
  },
  methods: {
    getUsers () {
      axios.get('/api/profile/', this.$store.getters.getAuthorizationHeader)
        .then(res => {
          this.users = res.data.results
        })
    },
    addUser () {
      axios.post(`/api/profile/`, this.user, this.$store.getters.getAuthorizationHeader)
        .then(res => {
          this.user = {
            username: null,
            password: null,
            first_name: null,
            last_name: null,
            camp_name: null,
            role: null
          }
          this.$notify({
            group: 'admin',
            title: `Added ${res.data.camp_name}!`,
            text: 'They should now be able to login.'
          })
          this.getUsers()
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: `Error`,
            text: err.response.data.detail
          })
        })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style lang="sass" scoped>
.dropdown
  display: block

.columns.flex-me
  flex-wrap: wrap

.image
  .avatar
    border-radius: 100%
</style>
