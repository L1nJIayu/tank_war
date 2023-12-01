<template>
  <div
    class="bomb iconfont"
    :class="icon"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
      transform: `rotate(${bombRotate})`
    }"></div>
</template>

<script lang="ts">

export enum BombDirection {
  Up = 1,
  Down,
  Left,
  Right,
}

export type BombItem = {
  id: number,
  position: {
    x: number,
    y: number
  },
  direction: BombDirection
}

type Position = {
  x: number,
  y: number
}

</script>

<script setup lang="ts">
import { ref, onMounted, watchPostEffect } from 'vue'

import { useStore } from '@/stores/store'
const { windowWidth, windowHeight } = useStore()

onMounted(() => {
  setPosition(props.position)
  setMoveDirection(props.direction)
})

const props = defineProps<{
  direction: BombDirection
  position: Position
}>()

const icon = ref('icon-bomb')

/* ============================= 位置 ============================= */
const position = ref<Position>({
  x: 0,
  y: 0
})
const setPosition = (pos: Position) => {
  const { x, y } = pos
  position.value = { x, y }
}

watchPostEffect(() => {
  const { x, y } = position.value
  if(
    x > windowWidth ||
    x < 0 ||
    y > windowWidth ||
    y < 0) {
    dead()
  }
})

/* ============================= 是否活着 ============================= */
const alive = ref(true)
const dead = () => {
  console.log('死了')
  alive.value = false
  icon.value = 'icon-bomb_exploded'
  stopMove()

}

/* ============================= 移动方向 ============================= */
const moveDirection = ref<BombDirection>()
const bombRotate = ref('0deg')
const setMoveDirection = (direction: BombDirection) => {
  moveDirection.value = direction

  switch(moveDirection.value) {
    case BombDirection.Up:
      bombRotate.value = `0deg`
      break
    case BombDirection.Down:
      bombRotate.value = `180deg`
      break
    case BombDirection.Left:
      bombRotate.value = `270deg`
      break
    case BombDirection.Right:
      bombRotate.value = `90deg`
      break
  }
  move()
}

const speed = 20  // 移动速度
const moveSwitch = ref<number | null>(null) // 移动开关
const move = () => {
  if(!moveSwitch.value) {
    moveSwitch.value = setInterval(() => {
      move()
    }, 60)
  }
  
  switch (moveDirection.value) {
    case BombDirection.Up:
      position.value.y -= speed
      break
    case BombDirection.Down:
      position.value.y += speed
      break
    case BombDirection.Right:
      position.value.x += speed
      break
    case BombDirection.Left:
      position.value.x -= speed
      break
    case BombDirection.Left:
      position.value.x -= speed
      break
  }
}
const stopMove = () => {

  if(moveSwitch.value) {
    clearInterval(moveSwitch.value)
    moveSwitch.value = null
  }
}


defineExpose({
  dead
})


</script>

<style lang="less">
.bomb {
  font-size: 60px;
  position: absolute;
}
.icon-bomb_exploded {
  color: #d81e06;
}

</style>