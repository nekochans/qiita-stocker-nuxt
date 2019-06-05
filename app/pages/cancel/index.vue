<template>
  <Cancel />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Cancel from '@/components/pages/cancel/index.vue'

@Component({
  components: {
    Cancel
  }
})
export default class extends Vue {}
</script>
