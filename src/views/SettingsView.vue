<script setup>
import CheckoutHelper from '@/utilities/CheckoutHelper'
import DashboardHelper from '@/utilities/DashboardHelper'
import LoginHelper from '@/utilities/LoginHelper'
import SettingsHelper from '@/utilities/SettingsHelper'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import InputFoto from '@/components/InputFoto.vue'
import GlobalHelper from '@/utilities/GlobalHelper'

const { biayaJasa, biayaLayanan, guideSelectPage, guideData,
    guideSelect,
    guideSelection,
    guideSelectPageBio,
    guideSelectBio,
    guideSelectors,
    selectedGuide,
    guideSelectTicket,
    guideSelectPageTicket,
    addGuide,
    isGuideChecked,
    formattedGuideSelection,
    fetchGuideData, 
} = CheckoutHelper

const { fetchOrderList, 
    getImageURL, 
    capitalizeFirstLetter,
    formatCurrency,
    showDeleteConfirmation,
    showDeleteConfirmationPopup,
    selectedItemToEdit,
    selectedItems,
    closePopup,
    closeDeletePopup,
    confirmDelete,
    dataDashboard 
} = DashboardHelper

const { fetchTargetedData } = SettingsHelper

const { assignAlert } = GlobalHelper

const router = useRouter()

//Modal Guide
const isAddingGuideModalVisible = ref(false)
const isEditGuideModalVisible = ref(false)
const selectedImageURL = ref('')

const editOrder = async (id) => {
  await fetchTargetedData(id)
  router.push({ name: 'edit', params: { id: id } })
}
const checkSettingsData = async () => {
  try {
    await fetchOrderList()
    await fetchGuideData()
  } catch (error) {
    console.error(error)
  }
}

const orderSelect = ref(false)
const orderSelectPage = () => {
  orderSelect.value = !orderSelect.value
}

const feePage = ref(false)
const toggleFeePage = () => {
    feePage.value = !feePage.value
}


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

//Modal Fees
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

const saveSettings = () => {
  biayaLayanan.value = Number(newBiayaLayanan.value)
  biayaJasa.value = Number(newBiayaJasa.value)
  sessionStorage.setItem('biayaLayanan', biayaLayanan.value)
  sessionStorage.setItem('biayaJasa', biayaJasa.value)

  assignAlert(true, 'Sukses', 'success', 'Biaya berhasil diubah!')
  setTimeout(() => {
    feePage.value = false
  }, 3000)  
}

const resetSettings = () => {
  // Reset biaya layanan dan biaya jasa ke nilai default
  biayaLayanan.value = 2500
  biayaJasa.value = 1000
  newBiayaLayanan.value = biayaLayanan.value
  newBiayaJasa.value = biayaJasa.value
  sessionStorage.setItem('biayaLayanan', biayaLayanan.value)
  sessionStorage.setItem('biayaJasa', biayaJasa.value)

  assignAlert(true, 'Sukses', 'success', 'Biaya berhasil di-reset!')
  setTimeout(() => {
    feePage.value = false
  }, 3000)  

}

const fetchFeeSettings = () => {
  const savedBiayaLayanan = sessionStorage.getItem('biayaLayanan');
  if (savedBiayaLayanan) {
    biayaLayanan.value = parseInt(savedBiayaLayanan);
  }
  
  const savedBiayaJasa = sessionStorage.getItem('biayaJasa');
  if (savedBiayaJasa) {
    biayaJasa.value = parseInt(savedBiayaJasa);
  }
}

const newBiayaLayanan = ref(biayaLayanan.value)
const newBiayaJasa = ref(biayaJasa.value)



onMounted(() => {
    fetchGuideData()
    fetchFeeSettings()
    checkSettingsData()
});
</script>

<template>
  <main>
    <h4 class="fw-600 sm-bottom-1">Pengaturan</h4>

    <section
      class="settings_modal-overlay w-full h-full"
      v-if="LoginHelper.userData.value.role === 'SUPER_ADMIN' && feePage"
    >
      <div class="settings_modal-container">
        <div class="settings__orders-content_modal-header">
          <h5 class="fw-600">Fees</h5>
          <ph-x :size="20" weight="bold" @click="toggleFeePage"/>
        </div>
        <div class="settings__fees-content_modal pd-1">
            <div class="settings__fees-content_modal_input-group">
                <div class="fee">
                <p>Biaya Layanan</p>
                <input
                    class="input_biaya"
                    name="layanan"
                    v-model="newBiayaLayanan"
                />
                </div>
                <div class="service">
                <p>Biaya Jasa Aplikasi</p>
                <input
                    class="input_biaya"
                    name="jasa"
                    v-model="newBiayaJasa"
                />
                </div>
                <button class="save"  @click="saveSettings">Simpan</button>
                <button class="reset" @click="resetSettings">Reset</button>
            </div>
        </div>
        </div>
    </section>

    <section class="admin">
        <div class="settings__menu">
        <button class="settings__menu-items" @click="toggleFeePage" v-if="LoginHelper.userData.value.role === 'SUPER_ADMIN'">
            <ph-coins :size="48" color="var(--color-primary)" />
            <span>Fees</span>
        </button>
        <button class="settings__menu-items" @click="guideSelectPage">
            <ph-binoculars :size="48" color="var(--color-primary)" weight="fill"/>
            <span>Guide</span>
            </button>
        <button class="settings__menu-items" @click="orderSelectPage">
            <ph-ticket :size="48" color="var(--color-primary)" />
            <span>Orders</span>
        </button>
        
        <button class="settings__menu-items" @click="toggleFeePage" v-if="LoginHelper.userData.value.role === 'SUPER_ADMIN'">
            <ph-squares-four :size="48" color="var(--color-primary)" />
            <span>Category</span>
        </button>
        <button class="settings__menu-items" @click="toggleFeePage" v-if="LoginHelper.userData.value.role === 'SUPER_ADMIN'">
            <ph-folder :size="48" color="var(--color-primary)" />
            <span>Tipe</span>
        </button>
        <button class="settings__menu-items" @click="toggleFeePage" v-if="LoginHelper.userData.value.role === 'SUPER_ADMIN'">
            <ph-folders :size="48" color="var(--color-primary)" />
            <span>Subtipe</span>
        </button>
        
        
        </div>
      
    </section>

    <section class="settings_modal-overlay  flex align-items-center justify-content-center w-full h-full" v-if="orderSelect">
      <div class="settings_modal-container">
        <div class="settings__fees-content_modal-header">
          <h5 class="fw-600">Orders</h5>
          <ph-x :size="20" weight="bold" @click="orderSelectPage" />
        </div>
        <div class="settings__orders-content pd-1">
          <div class="" v-for="(item, index) in dataDashboard" :key="index">
            <div class="settings__orders-content_item flex gap-1">
              <img
                :src="
                  item.image
                    ? getImageURL(item.image)
                    : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
                "
              />
              <div class="settings__orders-group-content w-full">
                <div class="settings__orders-content_item-head">
                  <h6>{{ item.name }}</h6>
                  <p>Rp{{ formatCurrency(item.price) }}</p>
                  <p>{{ capitalizeFirstLetter(item.category) }}</p>
                </div>
                <div class="settings__orders-content_item-cta flex align-items-end gap-1">
                  <button
                    class="settings-order__edit-button flex align-items-center justify-content-center gap[0.5]"
                    @click="editOrder(item.id)"
                  >
                    <ph-pencil-simple :size="16" weight="bold" />
                  </button>
                  <button
                    class="settings-order__remove-button flex align-items-center justify-content-center gap[0.5]"
                    @click="showDeleteConfirmation(item.id)"
                  >
                    <ph-trash :size="16" weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="overlay popup-confirmation__overlay w-full flex justify-content-center align-items-center"
      :class="{ active: showDeleteConfirmationPopup }"
      @click="closeDeletePopup()"
    >
      <div
        class="popup-confirmation__container flex fd-col gap-1 justify-content-center align-items-center"
        @click.stop
      >
        <h5 class="text-align-center">Apakah Anda Yakin Ingin Menghapus Tiket?</h5>
        <div class="popup-confimation__button-confirmation w-full flex justify-content-sa">
          <button @click="confirmDelete()">Hapus</button>
          <button @click="closeDeletePopup()">Batal</button>
        </div>
      </div>
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
    </main>
</template>

<style scoped>
body {
  font-family: 'Raleway', sans-serif;
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


.settings__menu{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
}

.settings__menu-items {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-family: 'Raleway', sans-serif;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 1px 3px 10px rgb(0, 0, 0, 0.2);
}

.settings__menu-items span {
    font-weight: 600;
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

.settings__fees-content_modal-header,
.settings__orders-content_modal-header,
.order-details__guide-select-content_modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border-bottom: 1px solid black;
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
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.order-detail__guide-select-content_guide-selector .bg-yellow {
  background-color: #e6be58;
  border-radius: 0 0.5rem 0.5rem 0;
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
  background-color: transparent;
  border: 0.5px solid black;
  border-radius: 100%;
  width: 0.8rem;
  height: 0.8rem;
  padding: 0.1rem;
}

.order-detail__guide-select-content_guide-selector_radio > .selected {
  background-color: #e6be58;
  filter: blur(1px);
  border-radius: 100%;
  width: 100%;
  height: 100%;
}





.settings_modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
}

.settings_modal-container {
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
}

.settings__orders-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  align-content: center;
  overflow: scroll;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #ccc transparent
}

.settings__orders-content::-webkit-scrollbar {
  width: 20px; /* Width of the scrollbar */
  border-radius: 10px; /* Border radius to match card */
}

/* Track (the area where the scrollbar is) */
.settings__orders-content::-webkit-scrollbar-track {
  background: transparent; /* Transparent background */
}

/* Handle (the draggable part of the scrollbar) */
.settings__orders-content::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Color of the scrollbar handle */
  border-radius: 10px; /* Border radius to match card */
}

/* Handle on hover */
.settings__orders-content::-webkit-scrollbar-thumb:hover {
  background-color: #aaa; /* Darker color when hovered */
}

.settings__orders-group-content {
  display: inline-flex;
  justify-content: space-between;
}
.settings__orders-content_item {
  padding: 1rem;
  box-shadow: 0 2px 10px rgb(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}
.settings__orders-content_item img {
  height: 100px;
  max-height: 100px;
  width: auto;
  max-width: 150px;
  object-fit: cover;
}
.settings__orders-content_item-head h6 {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.settings-order__remove-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 4rem;
  background-color: var(--color-red-600);
  color: #fff;
  font-weight: bold;
  margin-right: 0.5rem;
}

.settings-order__edit-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 4rem;
  background-color: var(--color-yellow);
  color: #fff;
  font-weight: bold;
}

.popup-confirmation__overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.popup-confirmation__overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.popup-confirmation__container {
  background: #d9d9d9;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 345px;
  overflow: hidden;
  margin-top: 5rem;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
}

.popup-confirmation_overlay.active .popup-confirmation_container {
  transform: translateY(50%);
}

.popup-confimation__button-confirmation button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: white;
}

.guide-select_biodata-image {
  width: 300px;
  max-width: 300px;
  height: 300px;
  max-height: 300px;
  object-fit: cover;
}

.guide-select_biodata_add-ticket {
  border-radius: 0.25rem;
  background-color: var(--color-primary);
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  max-height: 70px;
  max-width: 100px;
}

.guide-select_ticket-btn {
  padding: 0.5rem;
  background-color: var(--color-primary);
  border-radius: 0.25rem;
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
