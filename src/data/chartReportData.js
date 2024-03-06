import { ref } from 'vue'

const target_year = ref('Tahun 2023')
const target_month = ref('Februari')

const yearlyData = ref([
  {
    name: 'Umum',
    color: '#35E490',
    data: [0, 3, 55, 38, 20, 31, 65, 65, 50, 32, 49, 31, 67]
  },
  {
    name: 'Pelajar',
    color: '#5855EE',
    data: [0, 8, 44, 78, 23, 56, 32, 89, 14, 67, 45, 21, 53]
  },
  {
    name: 'Mancanegara',
    color: '#7C0428',
    data: [0, 5, 62, 37, 88, 15, 74, 29, 46, 51, 18, 83, 39]
  }
])

const monthlyData = ref([
  {
    name: 'Umum',
    color: '#35E490',
    data: [
      0, 3, 22, 40, 75, 18, 63, 29, 50, 84, 37, 66, 11, 49, 8, 57, 77, 20, 4, 12, 28, 6, 84, 40, 30,
      51, 63, 95, 61
    ]
  },
  {
    name: 'Pelajar',
    color: '#5855EE',
    data: [
      0, 2, 68, 92, 25, 49, 77, 35, 60, 14, 83, 28, 71, 14, 6, 73, 91, 44, 99, 63, 97, 69, 38, 71,
      89, 42, 27, 47, 84
    ]
  },
  {
    name: 'Mancanegara',
    color: '#7C0428',
    data: [
      0, 1, 81, 17, 55, 30, 46, 69, 23, 58, 12, 44, 72, 25, 19, 68, 7, 78, 13, 60, 70, 29, 52, 54,
      79, 51, 85, 32, 13
    ]
  }
])

const yearlyCategory = ref([
  '',
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OKT',
  'NOV',
  'DEC'
])

const monthlyCategory = ref([
  '',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28'
])

export default {
  target_year,
  yearlyData,
  yearlyCategory,
  target_month,
  monthlyData,
  monthlyCategory
}
