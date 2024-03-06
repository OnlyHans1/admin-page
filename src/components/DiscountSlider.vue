<script setup>
var slider = document.getElementById("mySlider");
var labels = document.querySelectorAll(".slider-labels span");

slider.oninput = function() {
  var value = (this.value - this.min) / (this.max - this.min) * 100;
  labels[0].innerHTML = "0%";
  labels[1].innerHTML = value + "%";
}
</script>

<template>
<div class="slider-container">
  <input type="range" min="0" max="100" value="0" class="slider" id="mySlider">
  <div class="slider-labels">
    <span>0%</span>
    <span>100%</span>
  </div>
</div>
</template>

<style>
.slider-container {
  position: relative;
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: #ccc;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #000;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #000;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.slider-labels span {
  font-size: 12px;
}

</style>