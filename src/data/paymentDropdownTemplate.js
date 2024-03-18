import { ref } from 'vue'

const paymentTemplate = ref([
  {
    title: 'ATM BJB',
    description: `Masukkan Kartu ATM BJB
        Pilih bahasa “Pilih Bahasa Indonesia/English” dan Input PIN
        Pilih menu “TRANSAKSI LAINNYA”
        Pilih menu “VIRTUAL ACCOUNT”
        Pilih Giro/Tabungan Masukkan Nomor Virtual Account (VA) dari Sistem Informasi Akademik (SIAKAD)
        Konfirmasi Pembayaran Penting! Pastikan tagihan yang dibayarkan termasuk dengan biaya admin Rp 3000
        Transaksi berhasil
        Selesai`
  },
  {
    title: 'Mobile Banking BJB',
    description: `Login Aplikasi DIGI by bank bjb/Digi Mobile
    Masukan Kode Akses Digi Mobile
    Pilih Menu Transfer
    Pilih Menu Virtual Account
    Masukan Nomor Virtual Account (VA) dari Sistem Informasi Akademik (SIAKAD)
    Konfirmasi Pembayaran. Penting! Pastikan tagihan yang dibayar termasuk dengan biaya admin Rp 3000, atau transaksi akan gagal
    Masukkan M-Pin DIGI Mobile
    Transaksi berhasil`
  },
  {
    title: 'Internet Banking BJB',
    description: `Login bjb NET
    Masukan User ID dan Password bjb NET
    Pilih menu Virtual Account
    Masukan Nomor Virtual Account (VA) dari Sistem Informasi Akademik (SIAKAD)
    Konfirmasi Pembayaran. Penting! Pastikan tagihan yang dibayar termasuk dengan biaya admin Rp 3000, atau transaksi akan gagal
    Masukkan Kode OTP
    Transaksi berhasil`
  },
  {
    title: 'QR Code BJB',
    description: ``
  }
])

export default {
  paymentTemplate
}
