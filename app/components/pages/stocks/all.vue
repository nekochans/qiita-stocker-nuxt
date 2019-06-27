<template>
  <section>
    <main class="container">
      <div class="columns">
        <div class="column is-3">
          <SideMenu
            :display-category-id="displayCategoryId"
            :categories="categories"
            @clickSaveCategory="onClickSaveCategory"
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
import { mapGetters, mapActions } from '@/store/qiita'

@Component({
  components: {
    SideMenu,
    StockList,
    Loading
  },
  computed: {
    ...mapGetters([
      'displayCategoryId',
      'categories',
      'uncategorizedStocks',
      'isCategorizing',
      'isLoading'
    ])
  },
  methods: {
    ...mapActions(['saveCategory'])
  }
})
export default class extends Vue {
  saveCategory!: (category: string) => void

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
}
</script>

<style scoped>
.container {
  padding-top: 1rem;
}
</style>
