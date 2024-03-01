<script setup>
import { ref } from 'vue'
import paymentDropdownTemplate from '@/data/paymentDropdownTemplate'

const { paymentTemplate } = paymentDropdownTemplate
const expanded = ref(Array(paymentTemplate.length).fill(false))

const toggleExpand = (index) => {
  expanded.value[index] = !expanded.value[index]
}
</script>

<template>
  <div class="payment-method__dropdown" v-for="(template, index) in paymentTemplate" :key="index">
    <div class="payment-method__dropdown-header" @click="toggleExpand(index)">
      <p class="fs-h5">{{ template.title }}</p>
      <i :class="['ri-arrow-down-s-line icon-20', expanded[index] ? 'expanded' : '']"></i>
    </div>
    <div class="payment-method__dropdown-content" :class="{ expanded: expanded[index] }">
      <template v-if="template.description.trim()">
        <ol>
          <li v-for="(desc, index) in template.description.split('\n')" :key="index">
            {{ desc.trim() }}
          </li>
        </ol>
      </template>
    </div>
  </div>
</template>

<style>
.payment-method__dropdown {
  border-radius: 0.5rem;
  background-color: #fff;
  overflow: hidden;
  border-bottom: 1px solid rgba(208, 213, 221, 1);
}

.payment-method__dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0.5rem 0;
  cursor: pointer;
}

.payment-method__dropdown-content {
  padding: 0 0.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.payment-method__dropdown-content.expanded {
  border-top: 1px solid var(--color-grey);
  padding: 0.5rem 0;
  max-height: 1000px;
  margin-bottom: 0.5rem;
  transition: max-height 0.3s ease;
}
.ri-arrow-down-s-line {
  transition: all 300ms ease;
}
.ri-arrow-down-s-line.expanded {
  transform: rotate(180deg);
}
</style>
