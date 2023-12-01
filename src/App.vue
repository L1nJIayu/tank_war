<template>
  <div class="game">
    <GameWindow />
    <GameInstruction />
  </div>
</template>



<script setup lang="ts">
import GameWindow from './views/GameWindow.vue';
import GameInstruction from './components/GameInstruction.vue'
</script>

<style lang="less">

.game {
  width: 100%;
  height: 100%;
  background-color: #978e8e;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;


}
</style>