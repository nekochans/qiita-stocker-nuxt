<template>
  <Error :error="error" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Error from '@/components/pages/error.vue'

@Component({
  components: {
    Error
  }
})
export default class extends Vue {
  @Prop()
  error?: Object
}
</script>
