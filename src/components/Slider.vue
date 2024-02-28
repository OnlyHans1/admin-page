<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  sliderWidth: { type: String, default: '392px' }
})
const emits = defineEmits(['update:discountValue', 'update:cashbackValue'])

const value = ref(props.min)
const tooltipLeft = ref('0px')
const show = ref(false)

const updateTooltip = (event) => {
  const thumbWidth = 10
  const percent =
    (event.target.value / (props.max - props.min)) * (event.target.clientWidth - thumbWidth)
  tooltipLeft.value = `${percent}px`
  emits('update:discountValue', value.value)
  emits('update:cashbackValue', value.value)
}

const showTooltip = () => {
  show.value = true
}

const hideTooltip = () => {
  show.value = false
}
</script>

<template>
  <div class="slider-container" @mousedown="showTooltip" @focus="showTooltip" @blur="hideTooltip">
    <input
      type="range"
      v-model="value"
      :min="min"
      :max="max"
      @input="updateTooltip"
      @mouseup="hideTooltip"
      class="slider"
      :style="{ width: sliderWidth }"
    />
    <div v-if="show" class="tooltip" :style="{ left: tooltipLeft }">{{ value }}</div>
  </div>
</template>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  margin: 20px;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(214, 212, 212, 1);
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.slider::-webkit-slider-thumb,
.slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(102, 102, 102, 1);
  cursor: pointer;
}
.tooltip {
  position: absolute;
  bottom: calc(100% - 0.25rem);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
}
</style>
