<template>
  <div id="dashboard">
    <div class="section">
        <div class="columns" v-for="article in articles" :key="article.slug">
          <div class="column is-8">
            <article class="media columns flex-me is-mobile">
              <figure class="media-left column is-full-mobile">
                <p class="image">
                  <img class="cover_photo" :src="article.cover_photo.url">
                </p>
              </figure>
              <div class="media-content column is-full-mobile has-text-centered-mobile">
                <div class="content">
                  <router-link :to="`/admin/edit/${article.slug}`"><h2 class="media-title">{{ article.title }}</h2></router-link>
                  <p>
                    <small>Posted by {{ article.author.camp_name }}</small> <small>31m ago</small>
                    <br>
                    {{ article.blurb }}
                  </p>
                  <div>
                    <span class="tag is-primary" v-for="tag in article.tags" :key="tag.slug">{{ tag.label }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="column is-2 has-text-centered">
            <toggle-button @change="togglePublished(i, article.slug)" :value="article.is_published" :color="{checked: '#00c18a'}" :labels="{checked: 'Published', unchecked: 'Unpublished'}" :width="115"/>
          </div>
          <div class="column is-2 has-text-centered">
            <router-link :to="`/admin/edit/${article.slug}`"><button class="button is-primary">Edit</button></router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Dashboard',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    togglePublished (index, slug) {
      this.articles[index].is_published = !this.articles[index].is_published
      const data = {
        is_published: this.articles[index].is_published
      }
      let text = `${this.articles[index].title} has been published`
      if (!this.articles[index].is_published) {
        text = `${this.articles[index].title} has been unpublished`
      }
      axios.patch(`/api/articles/${slug}/`, data, this.$store.getters.authorizationHeader)
        .then(res => {
          this.$notify({
            group: 'admin',
            title: `Updated!`,
            text: text
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
  created () {
    axios.get('/api/articles/', this.$store.getters.authorizationHeader)
      .then(res => {
        this.articles = res.data.results
      })
      .catch(err => {
        this.$notify({
          group: 'error',
          title: `Error`,
          text: err.response.data.detail
        })
      })
  }
}
</script>

<style lang="sass">
.tag
  margin-right: 5px

.columns.flex-me
  flex-wrap: wrap
</style>
