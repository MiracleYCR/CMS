<template>
  <div class="feature-container">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="item in featureData"
        :key="item.id"
        :title="item.title"
        :name="item.name"
      >
        <div v-html="item.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  featureData: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  :deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
