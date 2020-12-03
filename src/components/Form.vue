<template>
  <div class="mt-12 mx-8">
    <form class="max-w-2xl mx-auto" @submit.prevent="submitData()">
      <div class="relative text-gray-600">
        <input
          v-model="inputUrl"
          placeholder="url"
          class="bg-white h-10 w-full px-5 pr-10 rounded-full text-sm focus:outline-none"
          type="text"
        />
        <button class="absolute right-0 top-0 mt-4 mr-4">
          <span class="icon"></span>
        </button>
      </div>
    </form>
    <div class="h-8 mt-8 text-center">
      <p v-if="error" class="text-red-500">{{ error.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Parser from 'url-parse'

export default Vue.extend({
  data() {
    return {
      inputUrl: '',
      videoUrl: '',
      error: {
        message: '',
        disabled: false,
      },
    }
  },
  watch: {
    inputUrl() {
      this.error = {
        message: '',
        disabled: false,
      }
    },
  },
  created() {
    this.videoUrl = ''
  },
  methods: {
    urlValidate(url: string) {
      if (url && url.split('/').includes('twitter.com')) {
        return true
      }
      return false
    },
    urlParse(url: string) {
      const rule = /^[0-9]+$/
      const pathName = new Parser(url).pathname
      const tmpUrl = pathName.split('/')
      const tweetId = tmpUrl[tmpUrl.length - 1]
      if (rule.test(tweetId)) {
        return tweetId
      } else {
        return null
      }
    },
    async submitData() {
      try {
        if (this.urlValidate(this.inputUrl)) {
          const parseUrl = this.urlParse(this.inputUrl)
          if (!parseUrl) throw new Error('urlがおかしいです')
          await fetch(process.env.ENDPOINT_URL as string, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              url: parseUrl,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) {
                this.videoUrl = data.url
              } else {
                throw data.message
              }
            })
            .then(() => {
              window.open(this.videoUrl)
            })
            .catch((error) => {
              throw new Error(error)
            })
        } else {
          throw new Error('urlがおかしいです')
        }
      } catch (err) {
        this.error = {
          message: err.message,
          disabled: true,
        }
      }
    },
  },
})
</script>

<style scoped>
.icon {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 14px;
  height: 5px;
  border: 2px solid;
  border-top: 0;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-top: 8px;
}
.icon::after {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  border-left: 2px solid;
  border-bottom: 2px solid;
  transform: rotate(-45deg);
  left: 1px;
  bottom: 4px;
}
.icon::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-radius: 3px;
  width: 2px;
  height: 10px;
  background: currentColor;
  left: 4px;
  bottom: 5px;
}
</style>
