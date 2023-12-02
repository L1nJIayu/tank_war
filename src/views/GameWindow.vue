<template>
  <div
    class="gameWindow"
    :style="{
      width: windowWidth + 'px',
      height: windowHeight + 'px'
    }">
    <Tank ref="tank" @shoot="appendBomb"></Tank>


    <EnemyTank
      v-for="item in enemyTankList"
      :key="item.id"
      :tank-color="item.tankColor"
      :is-auto="item.isAuto"></EnemyTank>


    <Bomb
      v-for="item in bombList"
      :key="item.id"
      :direction="item.direction"
      :position="item.position"
    />

  </div>
</template>

<script lang="ts">
import type { BombItem } from '../components/Bomb.vue'
</script>


<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Tank from '../components/Tank.vue';
import EnemyTank from '../components/EnemyTank.vue';
import Bomb, {BombDirection} from '../components/Bomb.vue';

import { v4 as uuid } from 'uuid'

import { useStore } from '@/stores/store';

const {
  windowWidth,
  windowHeight,
  enemyTankList
} = useStore()

const tank = ref<InstanceType<typeof Tank>>()

const handleKeyDown = (event: KeyboardEvent) => {

  console.log(event.key)
  switch(event.key) {
    case 'ArrowUp': 
    case 'ArrowDown': 
    case 'ArrowLeft': 
    case 'ArrowRight': 
    case 'q':
    case 'Q':
      tank.value?.changeMoveDirection(event.key)
      break
    case ' ':
      tank.value?.shoot()
  }


}

/* ============================= 炮弹 ============================= */
const bombList = ref<BombItem[]>([])
const appendBomb = (attr: {
  position: {
    x: number,
    y: number
  },
  direction: BombDirection
}) => {
  bombList.value.push({
    ...attr,
    id: uuid()
  })
}

defineExpose({
  handleKeyDown
})


</script>

<style lang="less">

.gameWindow {
  background-color: rgb(240, 172, 82);
  border: 5px solid #000;
  border-radius: 24px;
  position: relative;
}
</style>