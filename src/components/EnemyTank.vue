<template>
  <div
    class="tank iconfont icon-tank"
    :style="{
      color: tankColor,
      fontSize: tankSize + 'px',
      left: position.x + 'px',
      top: position.y + 'px',
      transform: `rotate(${tankRotate})`
    }">
  </div>
</template>

<script lang="ts">

enum TankDirection {
  Up = 1,
  Down,
  Left,
  Right,
  None
}

enum CannonDirection {
  Up = 1,
  Down,
  Left,
  Right
}


</script>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { BombDirection } from './Bomb.vue'

import { useStore } from '@/stores/store';
const {
  windowWidth,
  windowHeight,
  tankSize
} = useStore()

onUnmounted(() => {
  if(autoMoveTimer.value) {
    clearInterval(autoMoveTimer.value)
    autoMoveTimer.value = null
  }
})

const props = defineProps<{
  tankColor?: string
  isAuto?: boolean
}>()
const emits = defineEmits(['shoot'])



/* ============================= 基本属性 ============================= */
// 位置
const position = ref({
  x: windowWidth / 2,
  y: windowHeight / 2
})
// 颜色
const tankColor = ref(props.tankColor || '#ff0')

/* ============================= 移动方向 ============================= */
const moveDirection = ref<TankDirection>(TankDirection.None)
const changeMoveDirection = (key: string) => {

  switch (key) {
    case 'ArrowUp':
      moveDirection.value = TankDirection.Up
      break
    case 'ArrowDown':
      moveDirection.value = TankDirection.Down
      break
    case 'ArrowLeft':
      moveDirection.value = TankDirection.Left
      break
    case 'ArrowRight':
      moveDirection.value = TankDirection.Right
      break
    case 'q':
    case 'Q':
      moveDirection.value = TankDirection.None
      break
  }

  changeCannonDirection(key)
  move()
}

const speed = 10  // 移动速度
const moveSwitch = ref<number | null>(null) // 移动开关
const move = () => {
  if(!moveSwitch.value) {
    moveSwitch.value = setInterval(() => {
      move()
    }, 60)
  }
  console.log('move')
  
  switch (moveDirection.value) {
    case TankDirection.Up:
      if(position.value.y >= 0) {
        position.value.y -= speed
      } else {
        stopMove()
      }
      break
    case TankDirection.Down:
      if(position.value.y <= windowHeight - tankSize) {
        position.value.y += speed
      } else {
        stopMove()
      }
      break
    case TankDirection.Right:
      if(position.value.x <= windowWidth - tankSize) {
        position.value.x += speed
      } else {
        stopMove()
      }
      break
    case TankDirection.Left:
      if(position.value.x >= 0 / 2) {
        position.value.x -= speed
      } else {
        stopMove()
      }
      break
    default:
      stopMove()
  }
}
const stopMove = () => {
  if(moveSwitch.value) {
    clearInterval(moveSwitch.value)
    moveSwitch.value = null
  }
}


const autoMoveTimer = ref<number | null>(null)
const autoMove = () => {
  const keys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
  if(!autoMoveTimer.value) {
    autoMoveTimer.value = setInterval(() => {
      const random = Math.floor(Math.random() * 4)
      changeMoveDirection(keys[random])
    }, 2000)
  }
}
if(props.isAuto) autoMove()

/* ============================= 炮筒方向 ============================= */
const cannonDirection = ref<CannonDirection>(CannonDirection.Up)
const tankRotate = ref('0deg')
const changeCannonDirection = (key: string) => {
  
  switch (key) {
    case 'ArrowUp':
      cannonDirection.value = CannonDirection.Up
      tankRotate.value = `0deg`
      break
    case 'ArrowDown':
      cannonDirection.value = CannonDirection.Down
      tankRotate.value = `180deg`
      break
    case 'ArrowLeft':
      cannonDirection.value = CannonDirection.Left
      tankRotate.value = `270deg`
      break
    case 'ArrowRight':
      cannonDirection.value = CannonDirection.Right
      tankRotate.value = `90deg`
      break
  }
}

const shoot = () => {

  let x = position.value.x
  let y = position.value.y
  // 偏移量
  switch(cannonDirection.value) {
    case CannonDirection.Up:
      x += 18
      y += 15
      break
    case CannonDirection.Down:
      x += 15
      y += 15
      break
    case CannonDirection.Left:
      y += 15
      x += 15
      break
    case CannonDirection.Right:
      x += 15
      y += 17
      break
  }
  
  emits('shoot', {
    position: { x, y },
    direction: cannonDirection.value
  })
}


defineExpose({
  changeMoveDirection,
  shoot
})

</script>

<style lang="less">
@tank_width: 80px;
@tank_height: 80px;

@cannon_width: calc(@tank_width - 10px);
@cannon_height: 10px;

.tank {
  border-radius: 50%;

  position: absolute;
  z-index: 100;
}
</style>