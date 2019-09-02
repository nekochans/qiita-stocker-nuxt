<template>
  <section>
    <StockCategories />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import StockCategories from '@/components/pages/stocks/categories/stockCategories.vue'
import { NuxtContext } from '@/types'
import { FetchCategorizedStockPayload } from '@/store/qiita'

@Component({
  layout: 'stocks',
  components: {
    StockCategories
  }
})
export default class extends Vue {
  async fetch({ store, error }: NuxtContext) {
    try {
      // TODO カテゴリーIDを変更
      const categoryId = 6
      const fetchCategorizedStockPayload: FetchCategorizedStockPayload = {
        categoryId,
        page: { page: 0, perPage: 0, relation: '' }
      }

      await store.dispatch(
        'qiita/fetchCategorizedStock',
        fetchCategorizedStockPayload
      )
      await store.dispatch('qiita/fetchCategory')
    } catch (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    }
  }
}
</script>
