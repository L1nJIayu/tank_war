<template>
  <div class="controller">
    <div class="controller_item">
      存活敌人数量：{{ enemyTankList.length }}
    </div>
    <div class="controller_item">
      击杀敌人数量：{{ 0 }}
    </div>
    <div class="controller_item">
      <el-button
        type="primary"
        size="small"
        :icon="Plus"
        @click="addEnemy">添加敌人</el-button>
    </div>
    <div class="controller_item">
      <el-button
        type="primary"
        size="small"
        :icon="Plus"
        @click="killAllEnemy">清除所有敌人</el-button>
    </div>
  </div>
</template>


<script setup lang="ts">

import { ref } from 'vue'
import { useStore } from '@/stores/store';
import { Plus } from '@element-plus/icons-vue'

const {
  enemyTankList,
  addEnemyTank,
  killAllEnemy
} = useStore()


const addEnemy = () => {
  console.log('添加一个敌人')
  addEnemyTank()
}
</script>


<style lang="less" scoped>
.controller {
  background-color: rgba(0, 0, 0, .1);

  width: 200px;
  min-height: 100px;
  padding: 12px;
  box-sizing: border-box;

  position: absolute;
  left: 12px;
  top: 12px;

  &_item {
    padding: 4px 0;
  }
}
</style>