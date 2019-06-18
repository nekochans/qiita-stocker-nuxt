<template>
  <Error :message="errorMessage" />
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
  errorMessage!: string

  mounted() {
    console.log(`🐑🐑🐑 ${this.errorMessage}`)
  }
}
</script>
