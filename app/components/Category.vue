<template>
  <div>
    <li>
      <div v-if="!editing">
        <a
          :data-category="category.categoryId"
          :class="`${isSelecting && 'is-active'}`"
          @click="onClickCategory"
        >
          {{ category.name }}
          <p class="edit" @click="editing = true">
            <span class="icon"> <i class="fas fa-pencil-alt fa-lg"></i> </span>
          </p>
        </a>
      </div>
      <div v-show="editing">
        編集中の表示
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Category } from '@/domain/domain'

@Component({
  directives: {
    focus: function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})
export default class extends Vue {
  @Prop()
  category!: Category

  editing: boolean = false
  isSelecting: boolean = false

  onClickCategory() {
    // TODO カテゴリ選択時の処理を追加
  }
}
</script>

<style scoped>
.edit {
  float: right;
  display: none;
  transition: color 0.2s ease-out;
}

.edit:hover {
  color: darkgray;
}

li:hover .edit {
  display: block;
}

.cancel {
  float: right;
}

.edit-field {
  margin-bottom: 0.3rem;
}

.input-field {
  width: auto;
}

.destroy {
  float: right;
}
</style>
