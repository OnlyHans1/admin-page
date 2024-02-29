<script setup>
import InputFoto from '@/components/InputFoto.vue'
import Category from '@/components/Category.vue';
import Slider from '@/components/Slider.vue'
import { ref } from 'vue';

const discountValue = ref(0);
// State to hold the selected image URL
const selectedImageURL = ref('');

// Method to handle the selected file from InputFoto component
const handleFileSelected = (file) => {
  // Convert the selected file to URL
  const imageURL = URL.createObjectURL(file);
  // Update the state with the selected image URL
  selectedImageURL.value = imageURL;
};

</script>

<template>
  <main class="add">
    <section class="add__input ">
      <InputFoto @file-selected="handleFileSelected" />
        <div class="add__input-card_title">
          <h3>Judul</h3>
          <div class="input-wrapper">
            <textarea class="text-input" rows="1"></textarea>
          </div>
        </div>
        <div class="add__input-category">
          <h3>Katergori</h3>
          <Category />
        </div>
        <div class="add__input-price">
          <h3>Harga</h3>
          <div class="input-price">
            <p>Rp.</p>
            <input type="number" name="" id="" v-model="price">
          </div>
        </div>
        <div class="add__input-discount">
          <h3>Discount</h3>
          <Slider v-model:discountValue="discountValue"/>
        </div>
    </section>

    <section class="add__preview w-full">
      <h1>Preview</h1>
      <div class="add__preview-card_container">
        <div class="add__preview-image_container">
          <img :src="selectedImageURL" alt="">
        </div>
        <div class="add__preview-card_details sm-top-1">
          <h2 class="fw-600">Tiket masuk keraton 2024 Bundling Umum</h2>
          <p>(tiket masuk keraton + museum + dalem agung, makasan siang nusantara)</p>
          <div class="add__preview-card-details-price">
            <h4 class="fw-600 sm-top-2">Rp. <span class="fw-600">50.000</span></h4>
          </div>
        </div>
      </div>
      <div class="add__preview-cta_container">
        <button class="add__preview_button" type="submit">Tambahkan</button>
      </div>
    </section>
  </main>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>


.add{
  display: flex;
  width: 100%;
  gap: 10rem;
}
.add__input{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

/* input judul textarea */
.text-input {
  min-width: 320px;
  width: 100%;
  height: 118px;;
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

/* input harga */
input[type=number] {
  width: 20rem;
  height: 2rem;
  border-radius: 0.5rem;
  appearance: none; /* Remove default appearance */
  -webkit-appearance: none; /* Remove default appearance for webkit browsers */
  -moz-appearance: textfield; /* Show default appearance for Firefox */
  background-color: transparent;
  padding-left: 35px;
  color: rgb(0, 0, 0);
  position: relative;
  border: 1px solid #000;
}

/* Remove spinner buttons for webkit browsers */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  display: none;
}

.input-price{
  position: relative;
}

.input-price p{
  position: absolute;
  top: 4px;
  left: 10px;
}

/* preview */
.add__preview{
  display: flex;
  flex-direction: column;
}
/* preview | card container */
.add__preview-card_container{
  margin-top: 1rem;
  width: calc(100% - 8rem);
  min-width: 449px;
  height: 30rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 10px 2px rgb(0, 0, 0, 0.2);
  padding: 1rem;
}
/* preview | card image container */

.add__preview-image_container{
  background-color: #D9D9D9;
  width: 100%;
  height: 206px;
  border-radius: 0.6rem;
}

/* preview | card details container */

.add__preview-card-details{
  margin-top: 1rem;
}
.add__preview-card-details-price{
  font-size: 24px;
}

/* form tambahkan button */
.add__preview-cta_container{
  margin-top: 2rem;
  width: calc(100% - 8rem);
  min-width: 449px;
  display: flex;
  align-items: center;
}
.add__preview_button{
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  font-size: 18px;
  line-height: 28px;
  background-color: #D9D9D9;
}


@media screen and (max-width: 1200px){
  .add{
    gap: 4rem;
    padding-right: 1rem;
  }
}
@media screen and (max-width: 1000px){
  .add{
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
