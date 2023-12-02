<template>
  <div class="game" 
    ref="GameRef"
    @keydown="handleKeyDown"
    tabindex="0">
    <GameWindow ref="GameWindowRef" />
    <GameInstruction />
    <Controller />
  </div>
</template>



<script setup lang="ts">
import { ref, nextTick } from 'vue'
import GameWindow from './views/GameWindow.vue';
import GameInstruction from './components/GameInstruction.vue'
import Controller from '@/components/Controller.vue';

const GameRef = ref<HTMLElement>()
nextTick(() => {
  GameRef.value?.focus()
})

const GameWindowRef = ref<InstanceType<typeof GameWindow>>()
const handleKeyDown = (event: KeyboardEvent) => GameWindowRef.value?.handleKeyDown(event)

</script>

<style lang="less">

.game {
  width: 100%;
  height: 100%;
  background-color: #978e8e;

  position: relative;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

}
</style>