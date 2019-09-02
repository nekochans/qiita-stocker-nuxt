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
            @clickCategory="onClickCategory"
            @clickStocksAll="onClickStocksAll"
          />
        </div>
        <div class="column is-9">
          <Loading v-show="isLoading" />
          <CategorizedStockEdit
            :is-loading="isLoading"
            :stocks-length="categorizedStocks.length"
            :is-categorizing="isCategorizing"
            :is-canceling-categorization="isCancelingCategorization"
            :display-categories="displayCategories"
            :checked-stock-article-ids="checkedCategorizedStockArticleIds"
            @clickSetIsCategorizing="onSetIsCategorizing"
            @clickSetIsCancelingCategorization="onSetIsCancelingCategorization"
            @clickCategorize="onClickCategorize"
          />
          <CategorizedStockList
            v-show="!isLoading"
            :stocks="categorizedStocks"
            :is-categorizing="isCategorizing"
            @clickCheckStock="onClickCheckStock"
            @clickCancelCategorization="onClickCancelCategorization"
          />
          <Pagination
            :is-loading="isLoading"
            :is-categorizing="isCategorizing"
            :checked-stock-article-ids="checkedCategorizedStockArticleIds"
            :stocks-length="categorizedStocks.length"
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
import CategorizedStockList from '@/components/CategorizedStockList.vue'
import Loading from '@/components/Loading.vue'
import Pagination from '@/components/Pagination.vue'
import CategorizedStockEdit from '@/components/CategorizedStockEdit.vue'
import {
  mapGetters,
  mapActions,
  UpdateCategoryPayload,
  CategorizePayload,
  FetchCategorizedStockPayload
} from '@/store/qiita'
import { Page, Category, CategorizedStock } from '@/domain/domain'

@Component({
  components: {
    SideMenu,
    CategorizedStockList,
    Loading,
    Pagination,
    CategorizedStockEdit
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'firstPage',
      'prevPage',
      'nextPage',
      'lastPage',
      'checkedCategorizedStockArticleIds',
      'displayCategoryId',
      'displayCategories',
      'categories',
      'categorizedStocks',
      'isCategorizing',
      'isCancelingCategorization',
      'isLoading'
    ])
  },
  methods: {
    ...mapActions([
      'fetchCategorizedStock',
      'saveCategory',
      'updateCategory',
      'destroyCategory',
      'setIsCategorizing',
      'setIsCancelingCategorization',
      'categorize',
      'checkStock'
    ])
  }
})
export default class extends Vue {
  fetchCategorizedStock!: (
    fetchCategorizedStockPayload: FetchCategorizedStockPayload
  ) => void
  saveCategory!: (category: string) => void
  updateCategory!: (updateCategoryPayload: UpdateCategoryPayload) => void
  destroyCategory!: (categoryId: number) => void
  setIsCategorizing!: () => void
  setIsCancelingCategorization!: () => void
  categorize!: (categorizePayload: CategorizePayload) => void
  checkStock!: (stock: CategorizedStock) => void
  checkedCategorizedStockArticleIds!: string[]

  onClickCategory() {
    // TODO カテゴリー選択時の動作を追加
    // this.resetData();
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

  async onClickCategorize(category: Category) {
    try {
      const categorizePayload: CategorizePayload = {
        category,
        stockArticleIds: this.checkedCategorizedStockArticleIds
      }
      await this.categorize(categorizePayload)
    } catch (error) {
      this.$router.push({
        name: 'original_error',
        params: {
          message: error.message
        }
      })
    }
  }

  onClickCancelCategorization(categorizedStockId: number) {
    // TODO カテゴライズ解除ボタン押下時の動作を追加
    console.log(`${categorizedStockId} onClickCancelCategorization`)
    // this.cancelCategorization(categorizedStockId);
  }

  onClickCheckStock(stock: CategorizedStock) {
    this.checkStock(stock)
  }

  fetchOtherPageStock(page: Page) {
    console.log(`${page} fetchOtherPageStock`)
    // try {
    //   await this.fetchUncategorizedStocks(page)
    // } catch (error) {
    //   this.$router.push({
    //     name: 'original_error',
    //     params: {
    //       message: error.message
    //     }
    //   })
    // }
  }

  onSetIsCategorizing() {
    this.setIsCategorizing()
  }

  onSetIsCancelingCategorization() {
    this.setIsCancelingCategorization()
  }

  onClickStocksAll() {
    // TODO 全てのストック選択時の動作を追加
    // this.resetData()
  }
}
</script>

<style scoped>
.container {
  padding-top: 1rem;
}
</style>
