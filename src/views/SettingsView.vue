<script setup>
import { onMounted, ref } from 'vue'
import CheckoutHelper from '@/utilities/CheckoutHelper'
import InputFoto from '@/components/InputFoto.vue'
import router from '@/router'

const {
  biayaJasa,
  biayaLayanan,
  guideSelectPage,
  guideData,
  guideSelect,
  guideSelectPageBio,
  guideSelectors,
  addGuide,
  isGuideChecked,
  fetchGuideData
} = CheckoutHelper

const isAddingGuideModalVisible = ref(false)
const isEditGuideModalVisible = ref(false)
const selectedImageURL = ref('')

onMounted(() => {
  fetchGuideData()
})

const showAddGuideModal = () => {
  isAddingGuideModalVisible.value = true
}

const hideAddGuideModal = () => {
  isAddingGuideModalVisible.value = false
}

const showEditGuideModal = () => {
  isEditGuideModalVisible.value = true
}

const hideEditGuideModal = () => {
  isEditGuideModalVisible.value = false
}

let formattedBiayaLayanan = biayaLayanan.value.toString()
let formattedBiayaJasa = biayaJasa.value.toString()

const updateBiayaLayanan = (event) => {
  biayaLayanan.value = Number(event.target.value)
}

const updateBiayaJasa = (event) => {
  biayaJasa.value = Number(event.target.value)
}

const handleFileSelected = (file) => {
  const reader = new FileReader()
  reader.onload = () => {
    selectedImageURL.value = reader.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <h1>Pengaturan Biaya</h1>
    <div class="container">
      <div class="super-admin">
        <div class="fee">
          <h2>Biaya Layanan</h2>
          <input
            class="input_biaya"
            name="layanan"
            v-model="formattedBiayaLayanan"
            @input="updateBiayaLayanan"
          />
        </div>
        <div class="service">
          <h2>Biaya Jasa Aplikasi</h2>
          <input
            class="input_biaya"
            name="jasa"
            v-model="formattedBiayaJasa"
            @input="updateBiayaJasa"
          />
        </div>
      </div>
      <button class="save">Simpan</button>
      <button class="reset">Reset</button>
      <div class="admin">
        <h1>Pengaturan Admin</h1>
        <button class="guide" @click="guideSelectPage">
          <span>Guide</span>
          <ph-gear :size="20" weight="fill" />
        </button>
      </div>

      <section class="order-details__select-content_modal-overlay" v-if="guideSelect">
        <div class="order-details__guide-select-content_modal sm-4">
          <div class="order-details__guide-select-content_modal-header">
            <h5 class="fw-600">Guide</h5>
            <ph-x :size="20" weight="bold" @click="guideSelectPage" />
          </div>
          <button
            class="addGuide flex justify-content-center align-items-center gap[0.5]"
            @click="showAddGuideModal"
          >
            <p>Tambah Guide</p>
            <ph-plus :size="16" weight="bold"></ph-plus>
          </button>
          <div
            class="order-detail__guide-select-content_modal-content relative pd-sd-2 pd-top-2 pd-bottom-2"
            :class="{ grid: guideSelectors }"
          >
            <div
              v-if="guideSelectors"
              v-for="(guide, index) in guideData"
              :key="index"
              class="order-detail__guide-select-content_guide-selector flex"
            >
              <span class="flex align-items-center gap[0.5] pd[0.5]" @click.prevent>
                <div class="order-detail__guide-select-content_guide-selector_radio">
                  <div v-if="isGuideChecked(guide.id)" class="selected"></div>
                </div>
                <label :for="guide.name">{{ guide.name }}</label>
              </span>
              <div
                class="bg-yellow flex align-items-center pd[0.5] cursor-pointer"
                @click="showEditGuideModal"
              >
                <ph-caret-right :size="16" weight="bold" />
              </div>
            </div>
          </div>
        </div>

        <div class="pop" v-if="isAddingGuideModalVisible">
          <div class="order-details__guide-select-content_modal sm-4" @click.stop>
            <div class="order-details__guide-select-content_modal-header">
              <h5 class="fw-600">Guide</h5>
              <ph-x :size="20" weight="bold" @click="guideSelectPage" />
            </div>
            <div
              class="order-details__guide-select_breadcrumb flex align-items-center gap-1 sm-bottom-1 cursor-pointer"
              @click="hideAddGuideModal"
            >
              <ph-caret-left :size="16" weight="bold" />
              <h6 weight="light">Kembali</h6>
            </div>
            <div class="flex gap-2">
              <div
                class="guide-select_ticket flex fd-col justify-content-center align-items-center gap-1"
              >
                <div class="input-image-preview">
                  <div class="image-preview" v-if="selectedImageURL">
                    <h6 class="image-preview-label">Preview</h6>
                    <img :src="selectedImageURL" alt="preview" class="preview-image" />
                  </div>
                </div>
                <InputFoto
                  @file-selected="handleFileSelected"
                  :selectedImageURL="selectedImageURL"
                />
              </div>

              <div class="input-biodata">
                <div class="input_wrapper flex fd-col">
                  <input type="text" placeholder="Nama" required />
                  <div class="gender">
                    <input type="radio" name="gender" value="pria" />Pria
                    <input type="radio" name="gender" value="wanita" /> Wanita
                  </div>
                  <input type="date" name="date" />
                  <input type="text" name="email" placeholder="Masukan Email" />
                </div>
                <textarea rows="1" v-model="desc"></textarea>
                <button class="sv-guide">Simpan</button>
              </div>
            </div>
          </div>
        </div>

        <div class="pop" v-if="isEditGuideModalVisible">
          <div class="order-details__guide-select-content_modal sm-4" @click.stop>
            <div class="order-details__guide-select-content_modal-header">
              <h5 class="fw-600">Guide</h5>
              <ph-x :size="20" weight="bold" @click="guideSelectPage" />
            </div>
            <div
              class="order-details__guide-select_breadcrumb flex align-items-center gap-1 sm-bottom-1 cursor-pointer"
              @click="hideEditGuideModal"
            >
              <ph-caret-left :size="16" weight="bold" />
              <h6 weight="light">Kembali</h6>
            </div>
            <div class="flex gap-2">
              <div
                class="guide-select_ticket flex fd-col justify-content-center align-items-center gap-1"
              >
                <div class="input-image-preview">
                  <div class="image-preview" v-if="selectedImageURL">
                    <h6 class="image-preview-label">Preview</h6>
                    <img :src="selectedImageURL" alt="preview" class="preview-image" />
                  </div>
                </div>
                <InputFoto
                  @file-selected="handleFileSelected"
                  :selectedImageURL="selectedImageURL"
                />
              </div>

              <div class="input-biodata">
                <div class="input_wrapper flex fd-col">
                  <input type="text" placeholder="Nama" required />
                  <div class="gender">
                    <input type="radio" name="gender" value="pria" />Pria
                    <input type="radio" name="gender" value="wanita" /> Wanita
                  </div>
                  <input type="date" name="date" />
                  <input type="text" name="email" placeholder="Masukan Email" />
                </div>
                <textarea rows="1" v-model="desc"></textarea>
                <button class="edit-guide">Edit</button>
                <button class="delete-guide">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Raleway', sans-serif;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1rem;
}

.super-admin {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

.input_biaya {
  width: 16rem;
  height: 2.5rem;
  margin-right: 8rem;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  border-radius: 5px;
  padding: 0.5rem;
}

input:hover,
input:focus {
  border-color: #ffd978;
}

.save,
.reset {
  width: 5.5rem;
  height: 2rem;
  margin-top: 2rem;
  color: white;
  border-radius: 20px;
}

.save {
  background: #28a745;
}

.save:hover {
  background: #17b53caa;
}

.reset {
  margin-left: 1rem;
  background: #dc3545;
}

.reset:hover {
  background: #cd23349b;
}

.admin {
  margin-top: 3rem;
}
.super-admin__input{
    display: inline-flex;
    margin-top: 1rem;
}

.guide {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  width: 16rem;
  height: 2.5rem;
  margin-right: 8rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  text-align: left;
  border: 1px solid black;
  border-radius: 5px;
}

.guide span {
  margin-right: 10.5rem;
}

.addGuide {
  background: #e6be58;
  width: 10rem;
  height: 2rem;
  margin-top: 1rem;
  margin-left: 2.1rem;
  color: black;
  border-radius: 10px;
}

.order-details__guide-select_breadcrumb {
  margin: 1rem;
}

.order-details__select-content_modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: 999;
}

.order-details__payment-select-content_modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  z-index: 100;
  background-color: rgb(245, 245, 245);
  border-radius: 0.5rem;
  box-shadow: 0px 2px 2px 0 rgb(0, 0, 0, 0.2);
}

.order-details__payment-select-content_modal-header i {
  cursor: pointer;
}

.order-details__payment-select-content_modal-content {
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-details__guide-select-content_modal {
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 514px;
  padding-bottom: 2rem;
  overflow: hidden;
  z-index: 100;
  position: relative;
}

.order-details__guide-select-content_modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border-bottom: 1px solid black;
}

.order-detail__guide-select-content_modal-content.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  align-content: center;
}

.order-detail__guide-select-content_guide-selector {
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.order-detail__guide-select-content_guide-selector .bg-yellow {
  background-color: #e6be58;
  border-radius: 0 0.5rem 0.5rem 0;
}

.order-detail__guide-select-content_guide-selector_radio {
  background-color: transparent;
  border: 0.5px solid black;
  border-radius: 100%;
  width: 0.8rem;
  height: 0.8rem;
  padding: 0.1rem;
}

.guide-select_ticket {
  padding-inline: 1rem;
  margin-left: 2rem;
  width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.guide-select_ticket-image {
  max-height: 70px;
  max-width: 100px;
}

.guide-select_ticket-btn {
  padding: 0.5rem;
  background-color: var(--color-primary);
  border-radius: 0.25rem;
}

.guide-Add-btn {
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 0.25rem;
  width: 100%;
  height: 2.5rem;
  justify-content: center;
}

.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: 999;
}
.pop-content {
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 514px;
  height: 80%;
  overflow: hidden;
  z-index: 100;
  position: relative;
}

.input-biodata {
  margin-left: 3rem;
}

.input-biodata input[type='text'],
.input-biodata input[type='date'],
.input-biodata input[type='email'] {
  width: 37rem;
  height: 3rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  border-radius: 5px;
  padding: 0.5rem;
}

.input-biodata input[type='email'] {
  margin-right: 8rem;
}

.input-biodata textarea {
  min-height: 200px;
  min-width: 100%;
  resize: none;
  border: 2px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  font: inherit;
  line-height: inherit;
}

.input-biodata .gender {
  margin-bottom: 1rem;
}

.input-biodata .gender input[type='radio'] {
  margin-right: 0.5rem;
  padding: 0;
  margin-left: 1rem;
  vertical-align: middle;
  appearance: none;
  outline: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid black;
  position: relative; /* Tambahkan properti position */
}

/* Tambahkan pseudoelemen ::before */
.input-biodata .gender input[type='radio']::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
}

.input-biodata .gender input[type='radio']:checked::before {
  background-color: rgb(64, 64, 64);
}

.sv-guide {
  width: 5.5rem;
  height: 2rem;
  margin-top: 1rem;
  color: black;
  border-radius: 20px;
  background-color: #e6be58;
}

.sv-guide:hover {
  background-color: #ffd987;
}

.edit-guide {
  background-color: #e6be58;
}

.edit-guide:hover {
  background-color: #ffd987;
}

.delete-guide {
  background: #dc3545;
}

.delete-guide:hover{
  background: #cd23349b;
}
.edit-guide,
.delete-guide {
  margin: 0.5rem;
  width: 5.5rem;
  height: 2rem;
  color: black;
  border-radius: 20px;
}

.input-image-preview {
  position: relative;
}

.image-preview {
  margin-bottom: 1rem;
}

.image-preview-label {
  margin-bottom: 0.5rem;
}

.preview-image {
  width: 100%;
  max-height: 200px;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
}
</style>