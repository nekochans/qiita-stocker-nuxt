<template>
  <header id="pagination-scroll-top" class="header">
    <nav class="navbar navbar-guest">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            <p class="is-size-4 has-text-black">Mindexer</p>
          </nuxt-link>
          <a
            role="button"
            class="navbar-burger"
            :class="{ 'is-active': isMenuActive }"
            @click="menuToggle()"
          >
            <span></span> <span></span> <span></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
          <div v-if="!isLoggedIn" class="navbar-end">
            <div class="navbar-item">
              <nuxt-link class="has-text-grey" to="/login">ログイン</nuxt-link>
            </div>
          </div>
          <div v-else class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">メニュー</a>
              <div class="navbar-dropdown is-right">
                <nuxt-link class="navbar-item" to="/stocks/all"
                  >ストック一覧</nuxt-link
                >
                <a class="navbar-item" @click="logout">ログアウト</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters, mapActions } from '@/store/qiita'

@Component({
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logoutAction'])
  }
})
export default class AppHeader extends Vue {
  logoutAction!: () => void

  isMenuActive: boolean = false

  menuToggle() {
    this.isMenuActive = !this.isMenuActive
  }

  async logout() {
    try {
      await this.logoutAction()
      this.$router.replace({ path: '/' })
    } catch (error) {
      this.$router.push({
        name: 'original_error',
        params: {
          message: error.message
        }
      })
    }
  }
}
</script>

<style scoped>
.navbar-guest {
  border-top: 6px solid #00d1b2;
  border-bottom: 1px solid #e8e8e8;
}
</style>
