<template>
  <div id="article">
    <section class="hero" :style="getBackgroundImage">
      <div class="hero-body">
        <div class="container squeeze">
          <div class="title-container">
            <h1><span class="title hero-title" contenteditable="true" ref="title" v-on:blur="updateInput('title')">{{ article.title }}</span></h1>
            <h2><span  contenteditable="true" class="subtitle hero-subtitle" ref="blurb" v-on:blur="updateInput('blurb')">{{ article.blurb }}</span></h2>
          </div>
        </div>
        <input type="file" accept="image/*" id="hero-image" class="is-hidden" ref="upload" @change="setImage($event.target.files)">
        <button class="button is-warning" @click="$refs.upload.click()">Change Image</button>
        <button class="button is-primary" @click="showModal = true">Crop</button>
      </div>
    </section>
    <div class="modal text-center" v-if="showModal">
      <div class="modal-container">
        <div class="modal-actions">
          <button class="button is-transparent is-pulled-right" @click="showModal = false"><i class="fa fa-close"></i></button>
        </div>
        <vue-cropper
          class="m-b-15"
          ref="cropper"
          :zoomable="false"
          :aspect-ratio="16/9"
          :toggleDragModeOnDblclick="false"
          v-if="imgSrc"
          :src="imgSrc">
        </vue-cropper>
        <div class="has-text-centered">
          <button class="button is-primary" @click="cropPhoto">Crop</button>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="is-fullwidth">
            <label>Tags</label>
            <v-select
                :close-on-select="false"
                :on-search="getTags"
                v-model="article.tags"
                multiple
                taggable
                :options="tags"
                placeholder="Add tags here!"></v-select>
          </div>
          <div class="m-t-15">
            <div id="toolbar">
              <span class="ql-formats">
              <select class="ql-font"></select>
              <select class="ql-size"></select>
              </span>
              <span class="ql-formats">
              <button class="ql-bold"></button>
              <button class="ql-italic"></button>
              <button class="ql-underline"></button>
              <button class="ql-strike"></button>
              </span>
              <span class="ql-formats">
              <select class="ql-color"></select>
              <select class="ql-background"></select>
              </span>
              <span class="ql-formats">
              <button class="ql-script" value="sub"></button>
              <button class="ql-script" value="super"></button>
              </span>
              <span class="ql-formats">
              <select class="ql-header"></select>
              <button class="ql-blockquote"></button>
              <button class="ql-code-block"></button>
              </span>
              <span class="ql-formats">
              <button class="ql-list" value="ordered"></button>
              <button class="ql-list" value="bullet"></button>
              <button class="ql-indent" value="-1"></button>
              <button class="ql-indent" value="+1"></button>
              </span>
              <span class="ql-formats">
              <button class="ql-direction" value="rtl"></button>
              <select class="ql-align"></select>
              </span>
              <span class="ql-formats">
              <button class="ql-link"></button>
              <button class="ql-image"></button>
              <button class="ql-video"></button>
              <button id="embed-image" @click="embedImageSource"><i class="fa fa-external-link"></i></button>
              </span>
              <span class="ql-formats">
              <button class="ql-clean"></button>
              </span>
              <span class="ql-formats">
                <button id="comment"><i class="fa fa-comment" @click="commentHighlight"></i></button>
              </span>
            </div>
            <input type="file" accept="image/*" id="quill-image" class="is-hidden" ref="image" @change="quillUpload($event.target)">
            <quill-editor ref="editor" v-model="article.content" :options="editorOption"></quill-editor>
            <div class="has-text-centered">
              <button class="button is-primary m-t-15" @click.prevent="saveArticle">Save Article</button>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <comments :id="article.id"></comments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import vSelect from 'vue-select'
import VueCropper from 'vue-cropperjs'

import Comments from './Comments'

// require styles
import '../../../node_modules/quill/dist/quill.core.css'
import '../../../node_modules/quill/dist/quill.snow.css'
import '../../../node_modules/quill/dist/quill.bubble.css'

import { quillEditor, Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

const Inline = Quill.import('blots/inline')
class Comment extends Inline {
  static create (value) {
    let node = super.create()
    node.setAttribute('comment-id', value.id)
    node.setAttribute('comment', value.comment)
    return node
  }

  static formats () {
    return true
  }
}
Comment.blotName = 'comment'
Comment.tagName = 'span'
Comment.className = 'comment'

const BaseImageFormat = Quill.import('formats/image')
const ImageFormatAttributesList = [
  'alt',
  'height',
  'width',
  'style'
]

class ImageFormat extends BaseImageFormat {
  static formats (domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }
  format (name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

Quill.register(ImageFormat, true)
Quill.register(Comment)

export default {
  name: 'Article',
  components: {
    quillEditor,
    vSelect,
    VueCropper,
    'comments': Comments
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.slug) {
        axios.get(`/api/articles/${vm.$route.params.slug}/`, vm.$store.getters.authorizationHeader)
        .then(res => {
          vm.article = res.data
          vm.article.image = vm.article.cover_photo.id
          vm.imgName = vm.article.cover_photo.url.split('media/images/')[1]
          vm.imgSrc = vm.article.cover_photo.url
        })
        .catch(error => console.log(error))
        vm.editing = true
      }
      next()
    })
  },
  data () {
    return {
      article: {
        blurb: 'Write a short description here.',
        content: null,
        title: 'Your Article Title Goes Here',
        image: null, // write-only
        tags: null,
        cover_photo: null
      },
      tags: [],
      isSaved: true,
      imgSrc: null,
      imgName: null,
      showModal: false,
      editorOption: {
        modules: {
          toolbar: {
            container: '#toolbar',
            handlers: {
              'image': function () {
                let f = document.querySelector('#quill-image')
                f.click()
              }
            }
          },
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        },
        placeholder: 'Write your new post here!'
      }
    }
  },
  watch: {
    // whenever question changes, this function will run
    showModal (newShowModal, oldShowModal) {
      let bodyStyle = document.querySelector('body').style
      this.showModal ? bodyStyle.overflowY = 'hidden' : bodyStyle.overflowY = ''
    }
  },
  computed: {
    getBackgroundImage () {
      if (this.article.cover_photo) {
        return `background-image: url('${this.article.cover_photo.url}')`
      }
      return ''
    }
  },
  methods: {
    commentHighlight () {
      const quill = this.$refs.editor.quill
      quill.format('comment', {
        id: 1,
        comment: 'could be better'
      })
      console.log('hello')
    },
    cropPhoto () {
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        let file = new File([blob], this.imgName, {type: blob.type, lastModified: Date.now()})
        const formData = new FormData()
        formData.append('url', file)
        axios.post('/api/images/', formData, this.$store.getters.authorizationHeader)
        .then(res => {
          const data = res.data
          this.showModal = false
          this.article.image = data.id
          this.article.cover_photo = data
          this.isSaved = false
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: `Error`,
            text: err.response.data.detail
          })
        })
      })
    },
    getTags (search, loading) {
      axios.get(`/api/tags/?search=${search}`)
        .then(res => {
          this.tags = res.data.results
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: `Error`,
            text: err.response.data.detail
          })
        })
    },
    modifyTags (tags) {
      const modified = []
      tags.forEach(tag => {
        if (tag.label) {
          modified.push({
            'label': tag.label
          })
        } else {
          modified.push({
            'label': tag
          })
        }
      })
      return modified
    },
    updateInput (key) {
      if (key === 'category') {
        this.article.category.name = this.$refs[key].innerText.toLowerCase()
      } else {
        this.article[key] = this.$refs[key].innerText
      }
      this.isSaved = false
    },
    saveArticle () {
      this.article.tags = this.modifyTags(this.article.tags)
      if (this.$route.params.slug) {
        axios.patch(`/api/articles/${this.article.slug}/`, this.article, this.$store.getters.authorizationHeader)
        .then(res => {
          this.article = res.data
          this.article.image = this.article.cover_photo.id
          this.$notify({
            group: 'admin',
            title: `Success!`,
            text: `${this.article.title} has been updated!`
          })
          this.isSaved = true
          this.$router.push(`/admin/edit/${res.data.slug}`)
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: `Error`,
            text: err.response.data.detail
          })
        })
      } else {
        axios.post('/api/articles/', this.article, this.$store.getters.authorizationHeader)
        .then(res => {
          this.$notify({
            group: 'admin',
            title: `Success!`,
            text: `${this.article.title} has been created! Publish it from your dashboard!`
          })
          this.isSaved = true
          this.$router.push(`/admin/edit/${res.data.slug}`)
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
    embedImageSource () {
      const quill = this.$refs.editor.quill
      quill.focus()
      let range = quill.getSelection()
      let src = prompt('Paste image link here!')
      quill.insertEmbed(range.index, 'image', src)
      this.isSaved = false
    },
    quillUpload (target) {
      const formData = new FormData()
      formData.append('url', target.files[0])
      axios.post('/api/images/', formData, this.$store.getters.authorizationHeader)
        .then(res => {
          const data = res.data
          const quill = this.$refs.editor.quill
          quill.focus()
          let range = quill.getSelection()
          quill.insertEmbed(range.index, 'image', data.url)
          this.isSaved = false
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: `Error`,
            text: err.response.data.detail
          })
        })
    },
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../mq'

.dropdown
  display: block

.hero
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  background-color: #808080

.hero-body
  text-align: center

.squeeze
  width: 50%

.title-container
  +mobile
    padding: 50px 0
  +tablet
    padding: 100px 0
  +desktop
    padding: 150px 0
  h2
    line-height: 1.5rem
  h1
    margin-bottom: 15px

span.hero-subtitle
  color: white
  background: $primaryTransparent
  +mobile
    font-weight: bold
  +tablet
    font-size: 1.5rem
  +desktop
    margin-top: 2

span.hero-title
  background: $primaryTransparent
  color: white
  +mobile
    font-weight: bold
  +tablet
    font-size: 3.5rem
  +desktop
    margin-top: 2

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

.pd-t-15
  padding-top: 15px
.m-t-15
  margin-top: 15px
</style>

