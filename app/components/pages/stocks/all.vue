<template>
  <section>
    <main class="container">
      <div class="columns">
        <div class="column is-3">
          <SideMenu
            :display-category-id="displayCategoryId"
            :categories="categories"
            @clickSaveCategory="onClickSaveCategory"
            @clickUpdateCategory="onClickUpdateCategory"
            @clickDestroyCategory="onClickDestroyCategory"
          />
        </div>
        <div class="column is-9">
          <Loading v-show="isLoading" />
          <StockList
            v-show="!isLoading"
            :stocks="uncategorizedStocks"
            :is-categorizing="isCategorizing"
            :is-loading="isLoading"
          />
          <Pagination
            :is-loading="isLoading"
            :is-categorizing="isCategorizing"
            :checked-stock-article-ids="checkedStockArticleIds"
            :stocks-length="uncategorizedStocks.length"
            :current-page="currentPage"
            :first-page="firstPage"
            :prev-page="prevPage"
            :next-page="nextPage"
            :last-page="lastPage"
            @clickGoToPage="fetchOtherPageStock"
          />
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SideMenu from '@/components/SideMenu.vue'
import StockList from '@/components/StockList.vue'
import Loading from '@/components/Loading.vue'
import Pagination from '@/components/Pagination.vue'
import { mapGetters, mapActions, UpdateCategoryPayload } from '@/store/qiita'
import { Page } from '@/domain/domain'

@Component({
  components: {
    SideMenu,
    StockList,
    Loading,
    Pagination
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'firstPage',
      'prevPage',
      'nextPage',
      'lastPage',
      'checkedStockArticleIds',
      'displayCategoryId',
      'categories',
      'uncategorizedStocks',
      'isCategorizing',
      'isLoading'
    ])
  },
  methods: {
    ...mapActions(['saveCategory', 'updateCategory', 'destroyCategory'])
  }
})
export default class extends Vue {
  saveCategory!: (category: string) => void
  updateCategory!: (updateCategoryPayload: UpdateCategoryPayload) => void
  destroyCategory!: (categoryId: number) => void

  fetchOtherPageStock(page: Page) {
    console.log(`${page} fetchOtherPageStock`)
  }

  async onClickSaveCategory(categoryName: string) {
    try {
      await this.saveCategory(categoryName)
    } catch (error) {
      this.$router.push({
        name: 'original_error',
        params: {
          message: error.message
        }
      })
    }
  }

  async onClickUpdateCategory(updateCategoryPayload: UpdateCategoryPayload) {
    try {
      await this.updateCategory(updateCategoryPayload)
    } catch (error) {
      this.$router.push({
        name: 'original_error',
        params: {
          message: error.message
        }
      })
    }
  }

  async onClickDestroyCategory(categoryId: number) {
    try {
      await this.destroyCategory(categoryId)
    } catch (error) {
      this.$router.push({
        name: 'original_error',
        params: {
          message: error.message
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 1rem;
}
</style>
