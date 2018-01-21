<template>
  <div class="section">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h2>{{ user.camp_name }}</h2>
        <div class="has-text-centered">
          <img class="profile-picture" :src="imgSrc">
        </div>
        <div class="has-text-centered">
          <input type="file" accept="image/*" id="avatar-input" class="is-hidden" ref="upload" @change="setImage($event.target.files)">
          <button class="button is-warning" @click="$refs.upload.click()">Change Image</button>
        </div>
        <div class="modal text-center" v-if="showModal">
          <div class="modal-container">
            <div class="modal-actions">
              <button class="button is-transparent is-pulled-right" @click="showModal = false"><i class="fa fa-close"></i></button>
            </div>
            <vue-cropper
              class="m-b-15"
              ref="cropper"
              :zoomable="false"
              :aspect-ratio="1.0"
              :toggleDragModeOnDblclick="false"
              v-if="imgSrc"
              :src="imgSrc">
            </vue-cropper>
            <div class="has-text-centered">
              <button class="button is-primary" @click="cropPhoto">Crop</button>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea class="textarea" type="text" placeholder="Describe yourself here!" v-model="user.bio"></textarea>
          </div>
        </div>
        <button type="submit" class="button is-primary" @click.prevent="updateUser">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import vSelect from 'vue-select'
import VueCropper from 'vue-cropperjs'

export default {
  name: 'Profile',
  data () {
    return {
      user: {
        avatar: null,
        bio: null
      },
      imgSrc: '/static/logo-square.jpg',
      showModal: null
    }
  },
  components: {
    VueCropper,
    vSelect
  },
  methods: {
    setImage (files) {
      const file = files[0]
      this.showModal = true
      this.imgName = file.name
      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
          this.imgSrc = event.target.result

          // rebuild cropperjs with the updated source
          if (this.$refs.cropper) {
            this.$refs.cropper.replace(event.target.result)
          }
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropPhoto () {
      this.imgSrc = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        this.user.avatar = new File([blob], this.imgName, {type: blob.type, lastModified: Date.now()})
        this.showModal = false
      })
    },
    updateUser () {
      const formData = new FormData()
      if (this.user.avatar) {
        formData.append('avatar', this.user.avatar)
      }
      formData.append('bio', this.user.bio)
      axios.patch(`/api/profile/${this.$store.state.id}/`, formData, this.$store.getters.authorizationHeader)
        .then(res => {
          this.$notify({
            group: 'admin',
            title: `Updated!`,
            text: 'Your profile is now up to date.'
          })
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      axios.get(`/api/profile/${vm.$store.state.id}/`, vm.$store.getters.getAuthorizationHeader)
        .then(res => {
          vm.user = res.data
          if (vm.user.avatar) {
            vm.imgSrc = vm.user.avatar
            vm.user.avatar = null
          }
        })
        .catch(err => console.log(err))
    })
  }
}
</script>

<style lang="sass">
@import '../../mq'

.cropper-crop-box, .cropper-view-box
  border-radius: 50%;

.cropper-view-box
  box-shadow: 0 0 0 1px #39f;
  outline: 0;

img.profile-picture
  border-radius: 100%
  border: 5px solid $primary
  height: 200px

.modal
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  display: block
  transition: opacity .3s ease

.modal-container
  max-height: calc(100vh - 50px)
  overflow-y: auto
  max-width: 700px
  margin: 25px auto
  padding: 20px 30px
  background-color: #fff
  border-radius: 2px
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
  transition: all .3s ease
  font-family: Helvetica, Arial, sans-serif

.modal-actions
  height: 30px
</style>
