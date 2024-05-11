<script setup>
import { onMounted, ref } from 'vue'
import SettingsHelper from '@/utilities/SettingsHelper'
import OrderTypeDropdown from '@/components/OrderTypeDropdown.vue'

const { modePopup, popupTitle, dataTarget } = SettingsHelper

const name = ref('')

const emits = defineEmits(['closeExtension'])
const closeExtension = () => {
  emits('closeExtension')
}

const saveChanges = () => {
  dataTarget.value.name = name.value
}

onMounted(() => {
  name.value = dataTarget.value.name
})
</script>

<template>
  <div class="settings-popup-extension__container flex fd-col">
    <div class="settings-popup-extension__header flex align-items-center justify-content-sb pd-1">
      <h6 class="fw-600">{{ popupTitle }}</h6>
      <ph-x :size="20" weight="bold" class="cursor-pointer" @click="closeExtension()" />
    </div>
    <div class="settings-popup-extension__content pd-1 flex fd-col gap[0.5]">
      <div class="settings-popup-extension__content--required flex fd-col gap[0.5]">
        <p>Nama</p>
        <input type="text" class="w-full" v-model="name" required />
      </div>
      <div
        class="settings-popup-extension__content-subtype flex fd-col gap[0.5]"
        v-if="modePopup === 'subtype'"
      >
        <p>Type</p>
        <OrderTypeDropdown />
      </div>
      <div
        class="settings-popup-extension__content-category flex fd-col gap[0.5]"
        v-if="modePopup === 'category'"
      >
        <p>Color</p>
        <input type="color" required />
      </div>
      <div class="settings-popup-extension__content-cta pd-top-1">
        <button class="settings-popup-extension__save-btn">Simpan</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-popup-extension__container {
  min-width: 20rem;
  background-color: white;
  border-radius: 0.5rem;
  font-family: 'Raleway';
  display: flex;
  flex-direction: column;
}

.settings-popup-extension__header {
  text-align: left;
  border-bottom: 1px solid black;
}

.settings-popup-extension__content input[type='text'] {
  height: 2rem;
  border-radius: 10px;
  padding: 0.5rem;
  font-family: 'Raleway';
  border: 0.5px solid #333;
}

.settings-popup-extension__content input[type='text']:focus {
  border: 2px solid #e6be58;
  outline: none;
}

.settings-popup-extension__save-btn {
  width: 5.5rem;
  height: 2rem;
  color: white;
  border-radius: 20px;
  background-color: #e6be58;
  font-weight: bold;
}
</style>
