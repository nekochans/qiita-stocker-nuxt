<template>
  <section>
    <All />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import All from '@/components/pages/stocks/all.vue'
import { NuxtContext } from '@/types'

@Component({
  layout: 'stocks',
  components: {
    All
  }
})
export default class extends Vue {
  async fetch({ store, error }: NuxtContext) {
    try {
      await store.dispatch('qiita/fetchUncategorizedStocks')
    } catch (e) {
      error({
        statusCode: e.response.data.code,
        message: e.response.data.message
      })
    }
  }
}
</script>
