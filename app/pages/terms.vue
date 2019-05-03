<template>
  <terms />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Terms from '@/components/pages/terms.vue'

@Component({
  components: {
    Terms
  }
})
export default class extends Vue {}
</script>
