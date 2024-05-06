<script setup>
import CheckoutHelper from '@/utilities/CheckoutHelper';

const { biayaJasa, biayaLayanan } = CheckoutHelper
</script>
<template>
    <h1>Pengaturan Biaya</h1>
<div class="container">
    <div class="super-admin">
        <div class="fee">
            <h2>Biaya Layanan</h2>
            <input name="layanan" v-model="biayaLayanan">
        </div>
        <div class="service">
            <h2>Biaya Jasa Aplikasi</h2>
            <input name="jasa" v-model="biayaJasa">
        </div>
    </div>
    <button class="save">Simpan</button>
    <button class="reset">Reset</button>
    <div class="admin">
        <h1>Pengaturan Admin</h1>
        <button class="guide">
            <span>Guide</span>
            <ph-gear :size="20" weight="fill" @click="" />
        </button>
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
    h2{
        font-size: 1rem;
    }
    .super-admin {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 1rem;
        justify-content: left;
    }
    input{
        width: 16rem;
        height: 2.5rem;
        margin-right: 8rem;  
        font-size: 1rem;
        font-family: 'Raleway', sans-serif;
        border-radius: 5px;
        padding: 0.5rem;
        /* border: 1px solid rgba(255, 255, 255, 0.5); */
    }
    input:hover, input:focus{
        border-color: #ffd978;
    }
    .save, .reset {
        width: 5.5rem;
        height: 2rem;
        margin-top: 2rem;
        border: 1px solid black;
        border-radius: 20px;
    }
    .save{
        background: #28a745;
    }
    .save:hover{
        background: #17b53caa;
    }
    .reset{
        margin-left: 1rem;
        background: #dc3545;
    }
    .reset:hover{
        background: #cd23349b;
    }
    .admin{
        margin-top: 1rem;
    }
    .guide{
        padding: 0.5rem;
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
</style>