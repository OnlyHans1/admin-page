import { ref } from 'vue'
import * as XLSX from 'xlsx'
import GlobalHelper from './GlobalHelper'

const { DB_BASE_URL, TRANSACTION_BASE_URL, ORDER_BASE_URL, DETAILTRANS_BASE_URL,showLoader } = GlobalHelper

const today = new Date()
today.setHours(7, 0, 0, 0)
const currentYear = today.getFullYear()
const currentMonth = today.getMonth() + 1
const monthName = today.toLocaleString('id-ID', { month: 'long' })

/* Report Global Helper */
const capitalizeFirstLetter = (str) => {
  const lowercaseStr = str.toLowerCase()
  return lowercaseStr.charAt(0).toUpperCase() + lowercaseStr.slice(1)
}
// Fungsi untuk mengubah format tanggal menjadi dd/mm/yyyy
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}

/* ReportView Helper */
const incomeRevenue = ref([])

const fetchIncomeRevenue = async () => {
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/income-revenue`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    incomeRevenue.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const generateExcel = () => {
  const yearlyTempData = JSON.parse(JSON.stringify(yearlyData.value))
  const monthlyTempData = JSON.parse(JSON.stringify(monthlyData.value))

  yearlyTempData.forEach((item) => {
    item.data = item.data.slice(1)
  })

  monthlyTempData.forEach((item) => {
    item.data = item.data.slice(1)
  })

  const wb = XLSX.utils.book_new()

  // Buat sheet untuk data tahunan
  const yearlySheetData = [
    // Baris untuk header primary
    [`Tabel Tingkat Keramaian ${targetYears.value}`],
    // Baris untuk header kategori dan nama kategori
    ['Bulan', 'Umum', 'Pelajar', 'Mancanegara'],
    // Baris untuk bulan
    ...yearlyCategory.value.slice(1).map((month, index) => {
      const rowData = [month]
      // Data untuk tiap kategori
      yearlyTempData.forEach((item) => {
        rowData.push(item.data[index])
      })
      return rowData
    })
  ]
  const yearlySheet = XLSX.utils.aoa_to_sheet(yearlySheetData)
  yearlySheet['!cols'] = [{ wpx: 80 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }]
  // Lebar kolom header 2 menjadi 12
  yearlySheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }]
  XLSX.utils.book_append_sheet(wb, yearlySheet, 'Yearly Data')

  // Buat sheet untuk data bulanan
  const monthlySheetData = [
    // Baris untuk header primary
    [`Tabel Tingkat Keramaian Bulan ${targetMonth.value}`],
    // Baris untuk header kategori dan nama kategori
    ['Tanggal', 'Umum', 'Pelajar', 'Mancanegara'],
    // Baris untuk hari
    ...monthlyCategory.value.slice(1).map((day, index) => {
      const rowData = [day]
      // Data untuk tiap kategori
      monthlyTempData.forEach((item) => {
        rowData.push(item.data[index])
      })
      return rowData
    })
  ]
  const monthlySheet = XLSX.utils.aoa_to_sheet(monthlySheetData)
  monthlySheet['!cols'] = [{ wpx: 80 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }] // Lebar kolom header 2 menjadi 12
  monthlySheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }]
  XLSX.utils.book_append_sheet(wb, monthlySheet, 'Monthly Data')

  // Simpan file Excel
  XLSX.writeFile(wb, 'chart_report.xlsx')
}

const printData = () => {
  const data = []

  // Batasi jumlah kolom untuk data bulanan
  const maxYearColumns = yearlyCategory.value.length
  const maxMonthColumns = monthlyCategory.value.length

  // Buat salinan data tahunan dan bulanan
  const yearlyTempData = JSON.parse(JSON.stringify(yearlyData.value))
  const monthlyTempData = JSON.parse(JSON.stringify(monthlyData.value))

  // Hapus data index 0
  yearlyTempData.forEach((item) => {
    item.data = item.data.slice(1)
  })

  monthlyTempData.forEach((item) => {
    item.data = item.data.slice(1)
  })

  const yearlyCategories = yearlyCategory.value.slice(1) // Mengambil bulan saja
  const yearlyTableData = [['Bulan', ...yearlyCategories, 'Total']] // Tambahkan judul "Bulan" di awal
  data.push([]) // Tambahkan baris kosong

  // Tambahkan data tahunan
  yearlyTempData.forEach((item, index) => {
    const rowData = [`${item.name}`] // Tambahkan kategori pada awal baris
    let total = 0
    item.data.slice(0, maxYearColumns - 1).forEach((value) => {
      // Batasi jumlah kolom
      rowData.push(`${value} Tiket`) // Menambahkan string "Tiket" sebelum nilai tiket
      total += value
    })
    rowData.push(`${total} Tiket`)
    yearlyTableData.push(rowData)
  })

  // Buat tabel tahunan
  const yearlyTable = document.createElement('table')
  yearlyTable.border = '1'
  yearlyTable.style.width = '100%'

  // Tambahkan data tahunan ke dalam tabel tahunan
  yearlyTableData.forEach((rowData) => {
    const row = yearlyTable.insertRow()
    rowData.forEach((cellData, index) => {
      const cell = row.insertCell()
      cell.innerHTML = cellData.content || cellData
      cell.style.cssText = cellData.style || '' // Atur gaya sel jika ada, jika tidak, gunakan yang default
      // Set text-align center untuk kolom umum, pelajar, dan mancanegara
      if (index > 0) {
        cell.style.textAlign = 'center'
      }
    })
  })

  // Buat tabel bulanan
  const monthlyTable = document.createElement('table')
  monthlyTable.border = '1'
  monthlyTable.style.width = '100%'

  const monthlyCategories = monthlyCategory.value.slice(1) // Mengambil tanggal saja
  const monthlyTableData = [['Tanggal', ...monthlyCategories, 'Total']] // Tambahkan judul "Tanggal" di awal
  data.push([]) // Tambahkan baris kosong

  // Tambahkan data bulanan
  monthlyTempData.forEach((item, index) => {
    const rowData = [`${item.name}`] // Tambahkan kategori pada awal baris
    let total = 0
    item.data.slice(0, maxMonthColumns - 1).forEach((value) => {
      // Batasi jumlah kolom
      rowData.push(`${value} Tiket`) // Menambahkan string "Tiket" sebelum nilai tiket
      total += value
    })
    rowData.push(`${total} Tiket`)
    monthlyTableData.push(rowData)
  })

  // Tambahkan data bulanan ke dalam tabel bulanan
  monthlyTableData.forEach((rowData) => {
    const row = monthlyTable.insertRow()
    rowData.forEach((cellData, index) => {
      const cell = row.insertCell()
      cell.innerHTML = cellData.content || cellData
      cell.style.cssText = cellData.style || '' // Atur gaya sel jika ada, jika tidak, gunakan yang default
      // Set text-align center untuk kolom umum, pelajar, dan mancanegara
      if (index > 0) {
        cell.style.textAlign = 'center'
      }
    })
  })

  // Buat container display flex
  const yearContainer = document.createElement('div')
  yearContainer.style.display = 'flex'
  yearContainer.style.justifyContent = 'center'
  yearContainer.style.alignItems = 'center'
  yearContainer.style.padding = '2.5rem'
  yearContainer.style.gap = '3rem'

  const monthContainer = document.createElement('div')
  monthContainer.style.display = 'flex'
  monthContainer.style.justifyContent = 'center'
  monthContainer.style.alignItems = 'center'
  monthContainer.style.padding = '2.5rem'
  monthContainer.style.gap = '3rem'

  // Tambahkan tabel tahunan dan bulanan ke dalam container
  yearContainer.appendChild(yearlyTable)
  monthContainer.appendChild(monthlyTable)
  // Cetak container
  const win = window.open('', '', 'fullscreen=yes')
  win.document.write('<html><head><title>Data Tingkat Keramaian</title></head><body>')
  win.document.write(
    `<h1 style="text-align: center;">Data Tingkat Keramaian Tahun ${targetYears.value}</h1>`
  )
  win.document.write(yearContainer.outerHTML)
  win.document.write(
    `<h1 style="text-align: center;">Data Tingkat Keramaian Bulan ${targetMonth.value}</h1>`
  )
  win.document.write(monthContainer.outerHTML)
  win.document.write('</body></html>')
  win.document.close()

  // Setelah menampilkan data, panggil fungsi window.print() untuk mencetak data tersebut
  win.onload = function () {
    win.print()
  }
}

/* ChartReport Helper*/
const selectedYear = ref(0)
const selectedMonth = ref(0)
const selectedMonthName = ref('')
const targetYears = ref([])
const yearlyCategory = ref([])
const yearlyData = ref([])

const targetMonths = ref([])
const monthlyCategory = ref([])
const monthlyData = ref([])

const fetchTargetYears = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/target-revenue/year`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    if (!targetYears.value.includes(currentYear)) {
      targetYears.value.push(currentYear)
    }
    targetYears.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const changeSelectedYear = async (year) => {
  try {
    selectedYear.value = year
    showLoader.value = true
    await fetchYearlyChartData()
    await fetchMonthlyChartData()
  } catch (error) {
    console.error(error)
  }
}
const fetchYearlyChartData = async () => {
  yearlyCategory.value = []
  yearlyData.value = []
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/chart-data/${encodeURIComponent(selectedYear.value)}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    yearlyCategory.value = data.data.yearlyCategory
    yearlyData.value = data.data.yearlyData
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchTargetMonths = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/target-revenue/month`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ]

    const formattedMonths = data.data.map((month) => {
      return monthNames[parseInt(month) - 1]
    })
    const currentMonthName = monthNames[new Date().getMonth()]
    if (!formattedMonths.includes(currentMonthName)) {
      formattedMonths.push(currentMonthName)
    }
    targetMonths.value = formattedMonths
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const changeSelectedMonth = async (monthName) => {
  try {
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ]

    // Mendapatkan indeks dari nama bulan yang diberikan
    const monthIndex = monthNames.indexOf(monthName)

    // Jika nama bulan ditemukan dalam array, mengatur nilai selectedMonth menjadi indeks bulan tersebut
    if (monthIndex !== -1) {
      selectedMonth.value = monthIndex + 1 // Menambah 1 karena indeks bulan dimulai dari 0
    } else {
      console.error('Invalid month name:', monthName)
      return
    }

    showLoader.value = true
    await fetchYearlyChartData()
    await fetchMonthlyChartData()
  } catch (error) {
    console.error(error)
  }
}
const setMonthLocaleString = () => {
  // Mendapatkan nama bulan untuk selectedMonth
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]
  selectedMonthName.value = monthNames[new Date().getMonth()]
}
const fetchMonthlyChartData = async () => {
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/chart-data/${encodeURIComponent(selectedYear.value)}/${encodeURIComponent(selectedMonth.value)}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    monthlyCategory.value = data.data.monthlyCategory
    monthlyData.value = data.data.monthlyData
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

/* TableReport Helper */
const activityReportData = ref([])
const category = ref('')

const updateCategory = (selectedCategory) => {
  category.value = selectedCategory
  fetchTableDataReport()
}

const fetchTableDataReport = async () => {
  try {
    let url = `${DB_BASE_URL.value}/${DETAILTRANS_BASE_URL.value}/table-data`
    if (category.value && category.value !== '') {
      url += `?category=${encodeURIComponent(category.value)}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data Report')
    }
    const data = await response.json()
    activityReportData.value = data.data
  } catch (error) {
    console.error('Error fetching data Report:', error)
  }
}

/* TicketInfoCard Helper */
const orderInfoCardData = ref([])

const fetchOrderInfoCardData = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/recent-purchase`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    orderInfoCardData.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default {
  incomeRevenue,
  fetchIncomeRevenue,
  generateExcel,
  printData,
  currentYear,
  selectedYear,
  targetYears,
  yearlyCategory,
  yearlyData,
  changeSelectedYear,
  fetchTargetYears,
  fetchYearlyChartData,
  currentMonth,
  monthName,
  selectedMonth,
  selectedMonthName,
  targetMonths,
  monthlyCategory,
  monthlyData,
  changeSelectedMonth,
  fetchTargetMonths,
  setMonthLocaleString,
  fetchMonthlyChartData,
  activityReportData,
  fetchTableDataReport,
  category,
  updateCategory,
  capitalizeFirstLetter,
  formatDate,
  formatCurrency,
  orderInfoCardData,
  fetchOrderInfoCardData
}
