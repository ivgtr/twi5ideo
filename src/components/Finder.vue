<template>
  <div class="wrapper">
    <form @submit.prevent="submitData()">
      <div class="inline-block flex">
        <label class="inline-block px-4 py-2" for="">url:</label>
        <input
          v-model="inputUrl"
          class="inline-block w-full px-4 py-2 rounded-md shadow-md md:hover:shadow-lg"
          type="text"
        />
      </div>
      <div class="w-full mt-8 text-center">
        <button
          class="inline-block px-4 py-2 rounded-md overflow-hidden shadow-md md:hover:shadow-lg"
        >
          開く
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      inputUrl: '',
      videoUrl: '',
    }
  },
  created() {
    this.videoUrl = ''
  },
  methods: {
    validateUrl(url: String) {
      if (url) return true
    },
    async submitData() {
      console.log('start')
      if (this.validateUrl(this.inputUrl)) {
        await fetch(process.env.ENDPOINT_URL as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            url: this.inputUrl,
          }),
        })
          .then((response) => response.json())
          .then((data) => (this.videoUrl = data.url))
          .then(() => {
            window.open(this.videoUrl)
          })
      }
      console.log('end')
    },
  },
})
</script>
