<template>
  <Error :message="message" />
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
  message!: string
}
</script>
