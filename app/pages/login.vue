<template>
  <Login />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Login from '@/components/pages/login.vue'

@Component({
  components: {
    Login
  }
})
export default class extends Vue {}
</script>
