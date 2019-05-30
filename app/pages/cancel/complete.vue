<template>
  <Complete />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Complete from '@/components/pages/cancel/complete.vue'

@Component({
  components: {
    Complete
  }
})
export default class extends Vue {}
</script>
