<script setup>
import InputFoto from '@/components/InputFoto.vue'
import CategoryDropdown from '@/components/CategoryDropdown.vue'
import AlertCard from '@/components/AlertCard.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()

const title = ref('')
const desc = ref('')
const category = ref('') //Dont remove until further notice - azarel
const price = ref('')
const selectedImageURL = ref('') // State to hold the selected image URL
const defaultImageURL = ref(
  'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
)
const submitAlert = ref(false)
const confirmAlert = ref(false)

const showAlert = ref(false)
const alertType = ref('')
const alertTitle = ref('')
const message = ref('')

const insertDatabase = async () => {
  try {
    const response = await fetch('http://localhost:3000/add/order-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: selectedImageURL.value,
        name: title.value,
        desc: desc.value,
        price: parseInt(price.value),
        category: category.value.toUpperCase()
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create order. Please try again.')
    } else {
      submitAlert.value = !submitAlert.value
      setTimeout(() => {
        route.push('/')
      }, 3000)
    }
  } catch (error) {
    console.log(error)
  }
}

const submit = () => {
  confirmAlert.value = false
  insertDatabase()
}
// Method to handle the selected file from InputFoto component
const handleFileSelected = (file) => {
  // Convert the selected file to URL
  const imageURL = URL.createObjectURL(file)
  // Update the state with the selected image URL
  selectedImageURL.value = imageURL
}

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price.value)
})

const updateCategory = (selectedCategory) => {
  category.value = selectedCategory
}

const getEmptyFields = () => {
  const emptyFields = []
  if (!title.value.trim()) {
    emptyFields.push('Judul')
  }
  if (!desc.value.trim()) {
    emptyFields.push('Desc')
  }
  if (!category.value.trim()) {
    emptyFields.push('Kategori')
  }
  if (!String(price.value).trim()) {
    emptyFields.push('Harga')
  }
  return emptyFields
}

const confirm = () => {
  const emptyFields = getEmptyFields()

  if (emptyFields.length > 0) {
    showAlert.value = true
    alertTitle.value = 'Error'
    alertType.value = 'danger' // Set your alert type
    message.value = `Isi kolom ${emptyFields.join(', ')} terlebih dahulu.` // Set your alert message
    return // Prevent confirmation if there are empty fields
  }

  confirmAlert.value = true
}
</script>

<template>
  <AlertCard
    :showAlert="showAlert"
    :alertTitle="alertTitle"
    :alertType="alertType"
    :message="message"
    @hideAlert="showAlert = false"
  />
  <div class="add__alert-confirmation_overlay" v-if="confirmAlert">
    <div class="add__alert-confirmation">
      <h2>Kamu yakin mau menambahkan {{ title ? title : 'Tiket' }}?</h2>
      <div class="button-group">
        <button @click="confirmAlert = false">Cancel</button>
        <button @click="submit()">Yes</button>
      </div>
    </div>
  </div>
  <div class="bubble-alert_submit" v-if="submitAlert">
    <p>Data berhasil ditambahkan</p>
  </div>

  <main class="add">
    <section class="add__input">
      <InputFoto @file-selected="handleFileSelected" :selectedImageURL="selectedImageURL" />
      <div class="add__input-card_title">
        <h3>Judul</h3>
        <div class="input_wrapper">
          <input class="title-input" type="text" rows="1" @input="title = $event.target.value" />
        </div>
      </div>
      <div class="add__input-card_title">
        <h3>Desc</h3>
        <div class="input_wrapper">
          <textarea class="desc-input" rows="1" @input="desc = $event.target.value"></textarea>
        </div>
      </div>
      <div class="add__input-category">
        <h3>Kategori</h3>
        <CategoryDropdown @option-selected="updateCategory" />
      </div>
      <div class="add__input-price">
        <h3>Harga</h3>
        <div class="input-price">
          <p>Rp.</p>
          <input type="number" name="" id="" v-model="price" />
        </div>
      </div>
    </section>

    <section class="add__preview w-full">
      <h1>Preview</h1>
      <div class="add__preview-card_container">
        <p class="add__preview-category">{{ category ? category : 'Category' }}</p>
        <div class="add__preview-image_container">
          <img :src="selectedImageURL ? selectedImageURL : defaultImageURL" alt="" />
        </div>
        <div class="add__preview-card_details sm-top-1">
          <h2 class="fw-600">{{ title ? title : 'Card Title' }}</h2>
          <p>{{ desc ? desc : 'Card Description' }}</p>
          <div class="add__preview-card-details-price">
            <h4 class="fw-600 sm-top-1">
              <span class="fw-600">{{ formattedPrice }}</span>
            </h4>
          </div>
        </div>
      </div>
      <div class="add__preview-cta_container">
        <button class="add__preview_button" type="submit" @click="confirm()">Tambahkan</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.add {
  display: flex;
  width: 100%;
  gap: 10rem;
}
/* input container */
.add__input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
/* input | title textarea */
.title-input,
/* input | desc textarea */
.desc-input {
  min-width: 320px;
  width: 100%;
  resize: none; /* Disable textarea resizing */
  border: none;
  padding: 0.5rem;
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  border: 1px solid black;
  line-height: inherit;
  border-radius: 0.5rem;
}
.desc-input {
  height: 118px;
}

/* input harga */
input[type='number'] {
  width: 20rem;
  height: 2rem;
  border-radius: 0.5rem;
  appearance: none;
  -webkit-appearance: none; /* Remove default appearance for webkit browsers */
  -moz-appearance: textfield; /* Show default appearance for Firefox */
  background-color: transparent;
  padding-left: 35px;
  color: rgb(0, 0, 0);
  position: relative;
  border: 1px solid #000;
}

/* Remove spinner buttons for webkit browsers */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  display: none;
}
input:focus,
button:focus,
textarea:focus {
  border-color: var(--color-primary); /* Change the border color to green */
  outline: none; /* Remove the default focus outline */
  box-shadow: 0 0 0 2px var(--color-primary); /* Add a green box-shadow to indicate focus */
}

.input-price {
  position: relative;
}

.input-price p {
  position: absolute;
  top: 4px;
  left: 10px;
}

/* preview */
.add__preview {
  display: flex;
  flex-direction: column;
}
/* preview | card container */
.add__preview-card_container {
  margin-top: 1rem;
  width: calc(100% - 8rem);
  min-width: 449px;
  height: 30rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 10px 2px rgb(0, 0, 0, 0.2);
  padding: 1rem;
  overflow-y: auto;
}

/* preview | card category */

.add__preview-category {
  background-color: #d5d5d5;
  border-radius: 0.3rem;
  width: fit-content;
  padding: 0 1rem;
  font-size: 13px;
  margin-bottom: 0.5rem;
}
/* preview | card image container */
.add__preview-image_container {
  background-color: #d9d9d9;
  width: 100%;
  height: 206px;
  border-radius: 0.6rem;
}
.add__preview-image_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
/* preview | card details container */
.add__preview-card-details {
  margin-top: 1rem;
}
.add__preview-card-details-price {
  font-size: 24px;
}

/* form tambahkan button */
.add__preview-cta_container {
  margin-top: 2rem;
  width: calc(100% - 8rem);
  min-width: 449px;
  display: flex;
  align-items: center;
}
.add__preview_button {
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  font-size: 18px;
  line-height: 28px;
  background-color: #d9d9d9;
}
.add__preview button {
  cursor: pointer;
}

/* add | alert */
.add__alert-confirmation_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: 999;
}
.add__alert-confirmation {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translate(-50%);
  background-color: #ffffff;
  border: 1px solid rgba(255, 226, 154, 0.9);
  padding: 1rem;
  border-radius: 0.5rem;
}

.add__alert-confirmation .button-group {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: end;
  margin-top: 1rem;
}
.add__alert-confirmation .button-group button {
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-primary);
  filter: saturate(10);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}
.add__alert-confirmation .button-group button:first-child {
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #8f8f8f;
  color: #ffffff;
}
/* bubble alert */
.bubble-alert_submit {
  position: fixed;
  top: 1rem;
  right: 1%;
  background-color: #d9d9d9;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

@media screen and (max-width: 1200px) {
  .add {
    gap: 4rem;
    padding-right: 1rem;
  }
}
@media screen and (max-width: 1000px) {
  .add {
    gap: 2rem;
  }
}

/* tablets */
@media screen and (max-width: 768px) {
  .add {
    flex-direction: column; /* Change to column layout */
    align-items: center;
    gap: 4rem;
  }

  .add__preview {
    margin-top: 1rem;
    width: 100%;
  }
}

/* For phones */
@media screen and (max-width: 480px) {
  .add__preview {
    margin-top: 1rem; /* Add space between sections */
    order: 1; /* Move below the input section */
  }

  .add__input {
    width: 100%; /* Take full width */
  }
}
</style>
