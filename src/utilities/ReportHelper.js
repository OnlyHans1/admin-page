import { ref } from 'vue'
import * as XLSX from 'xlsx'

const today = new Date()
today.setHours(7, 0, 0, 0)
const year = today.getFullYear();
const month = today.getMonth() + 1;


/* Report Global Helper */
const filteredCategory = ref()

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
    const response = await fetch('http://localhost:3000/report/income-revenue')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    incomeRevenue.value = data
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
    [`Tabel Tingkat Keramaian ${targetYear.value}`],
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

  // Tambahkan header untuk data tahunan
  data.push([
    {
      content: `Tabel Tingkat Keramaian ${targetYear.value}`,
      colspan: 4,
      style: 'font-weight: bold; text-align: center;'
    }
  ]) // Header dengan colspan 4
  const yearlyCategories = yearlyCategory.value.slice(1) // Mengambil bulan saja
  data.push(['Bulan', 'Umum', 'Pelajar', 'Mancanegara'])

  // Tambahkan data tahunan
  yearlyCategories.forEach((month, index) => {
    const rowData = [month]
    yearlyTempData.forEach((item) => {
      rowData.push(`${item.data[index]} Tiket`) // Menambahkan string "Tiket" sebelum nilai tiket
    })
    data.push(rowData)
  })

  // Tambahkan spasi antara tabel tahunan dan bulanan
  data.push([])

  // Tambahkan header untuk data bulanan
  data.push([
    {
      content: `Tabel Tingkat Keramaian Bulan ${targetMonth.value}`,
      colspan: 4,
      style: 'font-weight: bold; text-align: center;'
    }
  ]) // Header dengan colspan 4
  const monthlyCategories = monthlyCategory.value.slice(1) // Mengambil tanggal saja
  data.push(['Tanggal', 'Umum', 'Pelajar', 'Mancanegara'])

  // Tambahkan data bulanan
  monthlyCategories.forEach((day, index) => {
    const rowData = [day]
    monthlyTempData.forEach((item) => {
      rowData.push(`${item.data[index]} Tiket`) // Menambahkan string "Tiket" sebelum nilai tiket
    })
    data.push(rowData)
  })

  // Buat container display flex
  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.justifyContent = 'center'
  container.style.alignItems = 'center'
  container.style.padding = '2.5rem'
  container.style.gap = '3rem'

  // Buat tabel tahunan
  const yearlyTable = document.createElement('table')
  yearlyTable.border = '1'
  yearlyTable.style.width = '100%'

  // Tambahkan data tahunan ke dalam tabel tahunan
  data.slice(0, yearlyCategories.length + 2).forEach((rowData) => {
    const row = yearlyTable.insertRow()
    rowData.forEach((cellData, index) => {
      const cell = row.insertCell()
      cell.colSpan = cellData.colspan || 1 // Atur colspan jika ada, jika tidak, gunakan 1
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

  // Tambahkan data bulanan ke dalam tabel bulanan
  data.slice(yearlyCategories.length + 3).forEach((rowData) => {
    const row = monthlyTable.insertRow()
    rowData.forEach((cellData, index) => {
      const cell = row.insertCell()
      cell.colSpan = cellData.colspan || 1 // Atur colspan jika ada, jika tidak, gunakan 1
      cell.innerHTML = cellData.content || cellData
      cell.style.cssText = cellData.style || '' // Atur gaya sel jika ada, jika tidak, gunakan yang default
      // Set text-align center untuk kolom umum, pelajar, dan mancanegara
      if (index > 0) {
        cell.style.textAlign = 'center'
      }
    })
  })

  // Tambahkan tabel tahunan dan bulanan ke dalam container
  container.appendChild(yearlyTable)
  container.appendChild(monthlyTable)

  // Cetak container
  const win = window.open('', '', 'fullscreen=yes')
  win.document.write('<html><head><title>Data Tingkat Keramaian</title></head><body>')
  win.document.write('<h1 style="text-align: center;">Data Tingkat Keramaian</h1>')
  win.document.write(container.outerHTML) // Cetak container yang berisi tabel tahunan dan bulanan
  win.document.write('</body></html>')
  win.document.close()

  // Setelah menampilkan data, panggil fungsi window.print() untuk mencetak data tersebut
  win.onload = function () {
    win.print()
  }
}

/* ChartReport Helper*/
const targetYear = ref([])
const yearlyCategory = ref([])
const yearlyData = ref([])

const targetMonth = ref([])
const monthlyCategory = ref([])
const monthlyData = ref([])

const fetchYearlyChartData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/report/yearly-chart-data/${encodeURIComponent(year)}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    targetYear.value = data.targetYear
    yearlyCategory.value = data.yearlyCategory
    yearlyData.value = data.yearlyData
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchMonthlyChartData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/report/monthly-chart-data/${encodeURIComponent(year)}/${encodeURIComponent(month)}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    targetMonth.value = data.targetMonth
    monthlyCategory.value = data.monthlyCategory
    monthlyData.value = data.monthlyData
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

/* TableReport Helper */
const activityReportData = ref([])

const getFilteredCategory = (filter) => {
  filteredCategory.value = filter
}
const fetchTableDataReport = async () => {
  try {
    let url = 'http://localhost:3000/report/table-data'
    if (filteredCategory.value) {
      url += `?category=${encodeURIComponent(filteredCategory.value)}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data Report')
    }
    const data = await response.json()
    // Mengatur nilai activityReportData dengan hasil dari API
    activityReportData.value = data
  } catch (error) {
    console.error('Error fetching data Report:', error)
  }
}

/* TicketInfoCard Helper */
const orderInfoCardData = ref([])

const fetchOrderInfoCardData = async () => {
  try {
    const response = await fetch('http://localhost:3000/report/order-info')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    orderInfoCardData.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default {
  incomeRevenue,
  fetchIncomeRevenue,
  generateExcel,
  printData,
  targetYear,
  yearlyCategory,
  yearlyData,
  fetchYearlyChartData,
  targetMonth,
  monthlyCategory,
  monthlyData,
  fetchMonthlyChartData,
  activityReportData,
  fetchTableDataReport,
  getFilteredCategory,
  capitalizeFirstLetter,
  formatDate,
  formatCurrency,
  orderInfoCardData,
  fetchOrderInfoCardData
}
