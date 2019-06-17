<template>
  <section>
    <main class="container">
      <div class="columns">
        <div class="column is-3">
          <SideMenu />
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
import { Page } from '@/domain/domain'

@Component({
  components: {
    SideMenu,
    StockList,
    Loading
  },
  computed: {
    ...mapGetters(['uncategorizedStocks', 'isCategorizing', 'isLoading'])
  },
  methods: {
    ...mapActions(['fetchUncategorizedStocks'])
  }
})
export default class extends Vue {
  fetchUncategorizedStocks!: (page?: Page) => void

  async created() {
    await this.fetchUncategorizedStocks()
  }
}
</script>
