<template>
  <section>
    <All />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import All from '@/components/pages/stocks/All.vue'

@Component({
  layout: 'stocks',
  components: {
    All
  }
})
export default class extends Vue {
  async fetch({ store, error }: Context) {
    try {
      await store.dispatch('qiita/fetchUncategorizedStocks')
      await store.dispatch('qiita/saveDisplayCategoryId', 0)
    } catch (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    }
  }
}
</script>
