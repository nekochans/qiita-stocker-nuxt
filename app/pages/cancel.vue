<template>
  <Cancel />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cancel from '@/components/pages/cancel.vue'

@Component({
  components: {
    Cancel
  }
})
export default class extends Vue {}
</script>
