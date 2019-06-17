<template>
  <section>
    <All />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import All from '@/components/pages/stocks/all.vue'

@Component({
  layout: 'stocks',
  components: {
    All
  }
})
export default class extends Vue {}
</script>
