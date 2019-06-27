<template>
  <aside class="submenu menu">
    <DefaultMenuList :display-category-id="displayCategoryId" />
    <CategoryList :categories="categories" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Category } from '@/domain/domain'
import DefaultMenuList from '@/components/DefaultMenuList.vue'
import CategoryList from '@/components/CategoryList.vue'

@Component({
  components: {
    DefaultMenuList,
    CategoryList
  }
})
export default class extends Vue {
  @Prop()
  displayCategoryId!: number

  @Prop()
  categories!: Category[]
}
</script>
