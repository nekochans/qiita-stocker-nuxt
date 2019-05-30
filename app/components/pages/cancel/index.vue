<template>
  <main>
    <div class="container has-text-centered">
      <h1 class="title">退会</h1>
      <button class="button is-danger" @click="cancel">退会する</button>
      <h2 class="is-size-6 cancel-guide">
        アカウントの情報が全て削除されます。<br />削除した情報を復元することはできません。
      </h2>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  async cancel() {
    await this.$store.dispatch('qiita/cancel')
    this.$router.replace({ path: 'cancel/complete' })
  }
}
</script>

<style scoped>
.cancel-guide {
  padding-top: 1rem;
}
</style>
