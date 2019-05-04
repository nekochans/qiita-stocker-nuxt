<template>
  <Privacy />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Privacy from '@/components/pages/privacy.vue'

@Component({
  components: {
    Privacy
  }
})
export default class extends Vue {}
</script>
