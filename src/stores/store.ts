import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  
  
  const windowWidth = 800
  const windowHeight = 800

  const tankSize = 50

  return { 
    windowWidth,
    windowHeight,
    tankSize
   }
})
