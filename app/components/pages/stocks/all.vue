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
import { mapGetters } from '@/store/qiita'

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
  }
})
export default class extends Vue {
  onClickSaveCategory(categoryName: string) {
    // TODO vuexのActionを呼び出す
    console.log(categoryName)
  }
}
</script>

<style scoped>
.container {
  padding-top: 1rem;
}
</style>
