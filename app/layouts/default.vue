<template>
  <div>
    <app-header />
    <nuxt />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class Login extends Vue {}
</script>
