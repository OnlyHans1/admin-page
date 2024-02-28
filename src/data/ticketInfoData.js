import { ref } from 'vue'

const cardInfo = ref([
  {
    name: 'Umum',
    sold: 50
  },
  {
    name: 'Pelajar',
    sold: 35
  },
  {
    name: 'Mancanegara',
    sold: 20
  }
])

const incomeRevenue = ref('3.050.000')

export default { cardInfo, incomeRevenue }
