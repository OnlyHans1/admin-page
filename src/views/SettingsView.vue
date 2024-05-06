<script setup>
import CheckoutHelper from '@/utilities/CheckoutHelper';
import { onMounted } from 'vue';

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
    fetchGuideData, } = CheckoutHelper

    onMounted(() => {
        fetchGuideData()
    })
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
                <button class="addGuide flex justify-content-center align-items-center gap[0.5]">
                    <p>Tambah Guide </p>
                    <ph-plus :size="20" weight="bold"></ph-plus>
                </button>
                <div class="order-detail__guide-select-content_modal-content relative pd-sd-2 pd-top-2 pd-bottom-2"
                    :class="{ 'grid': guideSelectors }">
                    <div v-if="guideSelectors" v-for="(guide, index) in guideData" :key="index"
                        class="order-detail__guide-select-content_guide-selector flex">
                        <span class="flex align-items-center gap[0.5] pd[0.5]" @click.prevent>
                            <div class="order-detail__guide-select-content_guide-selector_radio">
                                <div v-if="isGuideChecked(guide.id)" class="selected"></div>
                            </div>
                            <label :for="guide.name">{{ guide.name }}</label>
                        </span>
                        <div class="bg-yellow flex align-items-center pd[0.5] cursor-pointer"
                            @click="guideSelectPageBio(guide)">
                            <ph-caret-right :size="16" weight="bold" />
                        </div>
                    </div>

                    <div class="order-details__guide-select_biodata relative" v-if="guideSelectBio">
                        <div class="order-details__guide-select_breadcrumb flex align-items-center gap-1 sm-bottom-1 cursor-pointer"
                            @click="guideSelectPageBio">
                            <ph-caret-left :size="16" weight="bold" />
                            <h6>Kembali</h6>
                        </div>

                        <div class="guide-select_biodata-content flex gap-2">
                            <div class="">
                                <img :src="selectedGuide.image
                        ? getImageURL(selectedGuide.image)
                        : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
                    " class="guide-select_biodata-image" />
                                <div class="flex justify-content-sb">
                                    <div class="guide-select_biodata_add-ticket w-full" @click="guideSelectPageTicket">
                                        Tambahkan Tiket<ph-caret-right :size="16" weight="bold" />
                                    </div>
                                </div>
                            </div>

                            <div class="guide-select_biodata-information">
                                <h6>
                                    {{ selectedGuide.name }} ({{ formatGender(selectedGuide.gender) }})
                                </h6>
                                <p>{{ `${determineAge(selectedGuide.birthdate)} Tahun` }}</p>
                                <p>{{ selectedGuide.email }}</p>
                                <p>
                                    {{ selectedGuide.desc ? selectedGuide.desc : 'Tidak ada deskripsi' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="order-details__guide-select_ticket relative" v-if="guideSelectTicket">
                        <div class="order-details__guide-select_breadcrumb flex align-items-center gap-1 sm-bottom-1 cursor-pointer"
                            @click="guideSelectPageTicket">
                            <ph-caret-left :size="16" weight="bold" />
                            <h6>Kembali</h6>
                        </div>

                        <div v-for="(item, index) in items" :key="index"
                            class="guide-select_ticket flex justify-content-sb sm-bottom-1">
                            <div class="flex gap-1">
                                <img :src="item.image
                        ? getImageURL(item.image)
                        : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
                    " class="guide-select_ticket-image" />
                                <div class="flex fd-col">
                                    <p class="fw-600">{{ item.name }}</p>
                                    <p>{{ formatCurrency(item.price) }}</p>
                                    <p>{{ `${item.amount} Tiket` }}</p>
                                </div>
                            </div>
                            <div class="guide-select_ticket-cta flex align-items-center">
                                <button class="guide-select_ticket-btn flex align-items-center"
                                    @click.prevent="addGuide(index)" @click="guideSelectPageTicket">
                                    <ph-plus :size="16" weight="bold" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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

input {
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

.addGuide {
    background: gainsboro;
    width: 10rem;
    height: 2rem;
    margin-top: 1rem;
    margin-left: 1rem;
    color: black;
    border-radius: 20px;
}

.admin {
    margin-top: 3rem;
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

.order-details__payment-select-content_modal-content button {
    display: flex;
    gap: 0.5rem;
    height: 2.5rem;
    align-items: center;
    justify-content: space-between;
    border: 0;
    background-color: inherit;
    border-bottom: 1px solid grey;
}

.order-details__payment-select-content_modal-content button span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.order-details__payment-select-content.else i {
    font-size: 16px;
    color: rgba(227, 38, 38, 1);
}

.order-details__guide-select-content_modal {
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 514px;
    height: 80%;
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

.order-detail__guide-select-content_guide-selector_radio>.selected {
    background-color: #e6be58;
    filter: blur(1px);
    border-radius: 100%;
    width: 100%;
    height: 100%;
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
    padding: 1rem;
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
</style>