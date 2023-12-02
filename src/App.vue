<template>
  <div class="game">
    <GameWindow />
    <GameInstruction />
    <Controller />
  </div>
</template>



<script setup lang="ts">
import GameWindow from './views/GameWindow.vue';
import GameInstruction from './components/GameInstruction.vue'
import Controller from '@/components/Controller.vue';


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