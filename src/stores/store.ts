import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

type Tank = {
  id: string,
  tankColor: string,
  isAuto: boolean
}

export const useStore = defineStore('store', () => {
  
  
  const windowWidth = 800
  const windowHeight = 800

  const tankSize = 50

  const enemyTankList = ref<Tank[]>([])
  const addEnemyTank = () => {
    enemyTankList.value.push({
      id: uuid(),
      tankColor: '#45a0d1',
      isAuto: true
    })
  }

  const killAllEnemy = () => {
    console.log(enemyTankList.value)
    enemyTankList.value.splice(0, enemyTankList.value.length)
  }
  

  return { 
    windowWidth,
    windowHeight,
    tankSize,
    enemyTankList,
    addEnemyTank,
    killAllEnemy
   }
})
