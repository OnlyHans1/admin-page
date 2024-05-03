<script setup>
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DashboardHelper from '@/utilities/DashboardHelper'
import GlobalHelper from '@/utilities/GlobalHelper'

const { assignAlert } = GlobalHelper


const {
  selectedItems,
  selectedItemToEdit,
  showConfirmationPopup,
  showDeleteConfirmation,
  showDeleteConfirmationPopup,
  confirmDelete,
  dataDashboard,
  fetchOrderList,
  getImageURL,
  capitalizeFirstLetter,
  formatCurrency,
  navigateToAdd,
  closePopup,
  closeDeletePopup,
  increaseAmount,
  decreaseAmount,
  saveToSessionStorage,
  handleItemClick,
  groupedItems,
} = DashboardHelper

const router = useRouter()

const editOrder = () => {
  selectedItemToEdit.value = selectedItems.value[0]
  closePopup()
  router.push({ name: 'edit', params: { id: selectedItemToEdit.value.id } })
}

watch(
  selectedItems.value,
  () => {
    saveToSessionStorage()
  },
  { deep: true }
)

onMounted(() => {
  fetchOrderList()
})
</script>

<template>
  <div class="dashboard__container flex fd-col align-items-f-start gap[0.5] pd-sd-2 pd-top-2">
    <div class="dashboard-header__container w-full flex fd-row align-items-center overflow-hidden">
      <div class="dashboard-add__container">
        <button class="dashboard-add__button" @click="navigateToAdd">
          <span class="dashboard-add__icon flex align-self-center">
            <ph-plus :size="32" weight="light" />
          </span>
          <p>Tambah</p>
        </button>
      </div>

      <div class="dashboard-recent__container flex fd-col">
        <h6>Baru Ditambahkan</h6>
        <div class="dashboard__card-container flex fd-row pd[0.5] vw-80">
          <div
            v-for="(item, index) in dataDashboard"
            :key="index"
            class="dashboard__card"
            @click="handleItemClick(item)"
          >
            <img
              :src="
                item.image
                  ? getImageURL(item.image)
                  : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
              "
            />
            <div class="dashboard__card-content flex fd-col align-items-f-start pd[0.5]">
              <p class="to-ellipsis">{{ item.name }}</p>
              <p>{{ capitalizeFirstLetter(item.category) }}</p>
              <p>Rp. {{ formatCurrency(item.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(items, category) in groupedItems"
      :key="category"
      :class="`dashboard-${category.toLowerCase()}__container w-full`"
    >
      <h4>{{ capitalizeFirstLetter(category) }}</h4>
      <div class="dashboard__card-container flex fd-row w-full pd-top-1 pd-sd-2">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="dashboard__card"
          @click="handleItemClick(item)"
        >
          <img
            :src="
              item.image
                ? getImageURL(item.image)
                : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
            "
            loading="lazy"
          />
          <div class="dashboard__card-content flex fd-col align-items-f-start pd[0.5]">
            <p class="to-ellipsis">{{ item.name }}</p>
            <p>{{ capitalizeFirstLetter(item.category) }}</p>
            <p>Rp. {{ formatCurrency(item.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="overlay popup-order__overlay w-full h-full pd-sd-10 pd-top-5 pd-bottom-5"
      :class="{ active: selectedItems.length > 0 }"
      @click="closePopup"
    >
      <div class="popup-order__container h-full" v-if="selectedItems.length > 0" @click.stop>
        <div class="popup-order__item-details flex fd-col gap[0.5] pd-2 h-full">
          <div class="flex justify-content-end w-full">
            <ph-x :size="32" weight="bold" @click="closePopup" class="cursor-pointer" />
          </div>
          <div class="flex">
            <img
              :src="
                selectedItems[0].image
                  ? getImageURL(selectedItems[0].image)
                  : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
              "
              class="popup-order__image"
            />
            <div class="flex fd-col sm-sd-2">
              <div>
                <h4 class="fw-600">{{ selectedItems[0].name }}</h4>
                <h6>{{ capitalizeFirstLetter(selectedItems[0].category) }}</h6>
                <h5 class="sm-top-1">Rp. {{ selectedItems[0].price }} / tiket</h5>
              </div>
              <div
                class="popup-order__amount-controls flex align-items-center pd[0.5] gap-1 sm-top-1"
              >
                <button @click.stop="decreaseAmount(selectedItems[0])">
                  <ph-minus-circle :size="24" />
                </button>
                <h4>{{ selectedItems[0].amount }}</h4>
                <button @click.stop="increaseAmount(selectedItems[0])">
                  <ph-plus-circle :size="24" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex fd-col justify-content-sb h-full">
            <p>{{ selectedItems[0].desc }}</p>
            <div class="flex fd-row justify-content-start">
              <button
                class="popup-order__remove-button flex align-items-center justify-content-center gap[0.5]"
                @click="showDeleteConfirmation()"
              >
                <ph-trash :size="16" weight="bold" />
                <span class="fw-600">Delete</span>
              </button>
              <button
                class="popup-order__edit-button flex align-items-center justify-content-center gap[0.5]"
                @click="editOrder()"
              >
                <ph-pencil-simple :size="16" weight="bold" />
                <span class="fw-600">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="overlay popup-confirmation__overlay w-full flex justify-content-center align-items-center"
      :class="{ active: showConfirmationPopup }"
      @click="closePopup()"
    >
      <div class="popup-confirmation__container" @click.stop>
        <h5 class="text-align-center">Pindah ke Halaman Tambah?</h5>
        <div class="popup-confimation__button-confirmation flex justify-content-sa">
          <button @click="router.push({ name: 'add' }), closePopup()">Ya</button>
          <button @click="closePopup()">Batal</button>
        </div>
      </div>
    </div>
    <!-- Pop up untuk delete -->
    <div
      class="overlay popup-confirmation__overlay w-full flex justify-content-center align-items-center"
      :class="{ active: showDeleteConfirmationPopup }"
      @click="closeDeletePopup()"
    >
      <div class="popup-confirmation__container" @click.stop>
        <h5 class="text-align-center">Apakah Anda Yakin Ingin Menghapus Tiket?</h5>
        <div
          class="popup-confimation__button-confirmation flex justify-content-sa align-items-center"
        >
          <button @click="confirmDelete()">Hapus</button>
          <button @click="closeDeletePopup()">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-header__container {
  gap: 2.5rem;
  white-space: nowrap;
  width: 100%;
}

.dashboard-add__container {
  transform: translateY(-25%);
}

.dashboard-add__button {
  background-color: #eeeded;
  flex-direction: column;
  width: 120px;
  height: 120px;
  color: #000000;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  border: 2px dashed #000000;
  cursor: pointer;
  transition: 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-add__button:hover {
  background-color: #4f4f4f;
  border: 2px dashed #000000;
}

.dashboard-add__button:hover + ph-plus {
  background-color: #d9d9d9;
}

.dashboard__card-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 0.5rem;
  gap: 1rem;
  flex: 1;
}

.dashboard__card {
  display: flex;
  flex-direction: column;
  width: 230px;
  cursor: pointer;
}

.dashboard__card > img {
  object-fit: cover;
  object-position: center;
  height: 140px;
  width: 230px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.dashboard__card:hover img {
  outline: 4px solid rgba(255, 217, 120, 1);
}

.popup-order__overlay {
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.popup-order__overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.popup-order__container {
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 514px;
  overflow: hidden;
}

.popup-confirmation__overlay {
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
  margin-top: auto;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
}

.popup-confirmation__overlay.active .popup-confirmation__container {
  transform: translateY(0);
}

.popup-confimation__button-confirmation button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: white;
}

.popup-order__image {
  height: auto;
  width: 40%;
  object-fit: cover;
  border-radius: 0.5rem;
  max-height: 500px;
}

.popup-order__remove-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 7rem;
  background-color: var(--color-red-600);
  color: #fff;
  font-weight: bold;
  margin-right: 0.5rem;
}

.popup-order__edit-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 7rem;
  background-color: var(--color-yellow);
  color: #fff;
  font-weight: bold;
}

.popup-confimation__button-confirmation button:first-child {
  background: #28a745;
  /* Green color for "Ya" button */
}

.popup-confimation__button-confirmation button:first-child:hover {
  background: #17b53caa;
  /* Green color for "Ya" button */
}

.popup-confimation__button-confirmation button:last-child {
  background: #dc3545;
  /* Red color for "Batal" button */
}

.popup-confimation__button-confirmation button:last-child:hover {
  background: #cd23349b;
  /* Red color for "Batal" button */
}
</style>
