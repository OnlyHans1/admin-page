<script setup>

const { selectedItem } = defineProps([ 'selectedItem' ]);
</script>

<template>
    <div class="popup-detail" v-if="selectedItem">
      <div class="popup-content">
        <div class="popup-img">
          <img src="../assets/images/Logo KKC.svg" alt="Logo Keraton Kasepuhan Cirebon" />
        </div>
        <div class="popup-detail_data align-self-f-start pd-sd-1">
          <h3>Nama</h3>
          <p>{{ selectedItem.nama }}</p>
          <h3>Reservasi</h3>
          <p>{{ selectedItem.pembelian }}</p>
          <h3>Jadwal</h3>
          <p>{{ selectedItem.jadwal }}</p>
          <h3>No Telp</h3>
          <p>{{ selectedItem.telp }}</p>
          <h3>Pembayaran</h3>
          <p>Transfer Bank: {{ selectedItem.pembayaran }}</p>
        </div>
        <button class="btn popup-button" @click="selectedItem = null">OK</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .popup-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 365px;
    height: 574px;
    font-family: 'Poppins';
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .popup-img {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .popup-img img {
    width: 140px;
    height: 145px;
  }
  
  .popup-content h3 {
    font-size: 20px;
    font-weight: 600;
  }
  
  .popup-content p {
    font-size: 16px;
    margin-bottom: 5px;
    margin-left: 10px;
  }
  
  .popup-content button {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .popup-content button {
    background-color: #ffe29a;
    font-family: 'Poppins';
    font-size: 16px;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .popup-content button:hover {
    background-color: #ffd477;
  }
  </style>
  