import { ref } from 'vue'

const tickets = ref([
  { name: 'Tiket Masuk Keraton Kasepuhan Cirebon', quantity: 1, price: 10000, category: 'Umum' },
  {
    name: "Tiket Peringatan Isra Mi'raj di Langgar Alit",
    quantity: 2,
    price: 10000,
    category: 'Umum'
  }
])

export default { tickets }
