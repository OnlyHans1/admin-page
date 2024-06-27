import { ref } from 'vue'
import * as XLSX from 'xlsx'
import GlobalHelper from './GlobalHelper'

const { DB_BASE_URL, TRANSACTION_BASE_URL, ORDER_BASE_URL, DETAILTRANS_BASE_URL, showLoader } =
  GlobalHelper

const today = new Date()
today.setHours(7, 0, 0, 0)
const currentYear = today.getFullYear()
const currentMonth = today.getMonth() + 1
const monthName = today.toLocaleString('id-ID', { month: 'long' })
const revenueKeraton = ref()

/* Report Global Helper */
const capitalizeFirstLetter = (str) => {
  const lowercaseStr = str.toLowerCase()
  return lowercaseStr.charAt(0).toUpperCase() + lowercaseStr.slice(1)
}
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
const incomeRevenue = ref(0)


const fetchIncomeRevenue = async () => {
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/income-revenue-curaweda`
    )
    if (!response.ok) throw Error('Failed to fetch Data')
    const responseData = await response.json()
    revenueKeraton.value = responseData.data.revenueKeraton
    incomeRevenue.value = responseData.data.total
    console.log(revenueKeraton)
  } catch (err) {
    console.log(err)
  }
}

const generateExcel = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${DETAILTRANS_BASE_URL.value}/table-data`);
    if (!response.ok) throw new Error('Failed to fetch data');

    const responseData = await response.json();
    const workbook = XLSX.utils.book_new();
    const tableSheetData = [];

    let rowIndex = 1;
    let currentTransactionId;

    // Adding headers to the sheet data
    tableSheetData.push(["No.", "Tanggal", "Pelanggan", "Nama Tiket", "Jenis Tiket", "Pembayaran", "Jumlah", "Harga", "Total", "Total Dibayar"]);

    responseData.data.forEach((data, i) => {
      const row = [];
      let numTabel = "", total = "";

      // Check if it's a new transaction
      if (data.transactionId !== currentTransactionId) {
        numTabel = rowIndex;
        total = +data.transaction.total;
        rowIndex++;
      }

      row.push(numTabel);
      row.push(data.transaction.plannedDate.split('T')[0]);
      row.push(data.transaction.customer?.name || data.transaction.user.name);
      row.push(data.order.name);
      row.push(data.order.category.name);
      row.push(data.transaction.method);
      row.push(data.amount);
      row.push(formatCurrency(data.order.price));
      row.push(formatCurrency(data.amount * data.order.price));
      row.push(formatCurrency(total));

      currentTransactionId = data.transactionId;
      tableSheetData.push(row);
    });

    // Create worksheet and add data to it
    const worksheet = XLSX.utils.aoa_to_sheet(tableSheetData);
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    // Auto size columns
    const colWidths = tableSheetData[0].map((_, colIndex) => {
      const colValues = tableSheetData.map(row => row[colIndex] ? row[colIndex].toString() : '');
      const maxLength = Math.max(...colValues.map(val => val.length));
      return { wch: maxLength + 2 }; // Adding padding for better spacing
    });
    worksheet['!cols'] = colWidths;

    const currencyColumns = [7, 8, 9]; // Indices of the columns to be formatted as currency
    currencyColumns.forEach(colIndex => {
      for (let rowIndex = 1; rowIndex <= range.e.r; ++rowIndex) {
        const cell_address = { c: colIndex, r: rowIndex };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!worksheet[cell_ref]) continue;
        if (!worksheet[cell_ref].s) worksheet[cell_ref].s = {};
        worksheet[cell_ref].s.numFmt = '[$Rp-421]#,##0.00'; // Indonesian Rupiah currency format
      }
    });

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendapatan Tiket Tahun 2024');

    // Write workbook to file
    XLSX.writeFile(workbook, 'Pendapatan_Tiket.xlsx');
  } catch (err) {
    console.error(err);
  }
}

// let yearlyTempData = yearlyData.value
// let monthlyTempData = monthlyData.value

// const wb = XLSX.utils.book_new()

// const yearlySheetData = [
//   [`Tabel Tingkat Keramaian ${selectedYear.value}`],
//   ['Bulan', ...yearlyCategory.value, 'Total']
// ]

// const yearlyTotals = new Array(yearlyCategory.value.length).fill(0)
// yearlyTempData.forEach((item) => {
//   const rowData = [item.name]
//   let total = 0
//   item.data.forEach((value, colIndex) => {
//     rowData.push(value)
//     total += value
//     yearlyTotals[colIndex] += value
//   })
//   rowData.push(total)
//   yearlySheetData.push(rowData)
// })

// yearlySheetData.push(['Total', ...yearlyTotals, yearlyTotals.reduce((a, b) => a + b, 0)])

// const yearlySheet = XLSX.utils.aoa_to_sheet(yearlySheetData)
// yearlySheet['!cols'] = [{ wpx: 80 }]
// XLSX.utils.book_append_sheet(wb, yearlySheet, 'Yearly Data')

// const monthlySheetData = [
//   [`Tabel Tingkat Keramaian Bulan ${selectedMonthName.value}`],
//   ['Tanggal', ...monthlyCategory.value, 'Total']
// ]

// const monthlyTotals = new Array(monthlyCategory.value.length).fill(0)

// monthlyTempData.forEach((item) => {
//   const rowData = [item.name]
//   let total = 0
//   item.data.forEach((value, colIndex) => {
//     rowData.push(value)
//     total += value
//     monthlyTotals[colIndex] += value
//   })
//   rowData.push(total)
//   monthlySheetData.push(rowData)
// })

// monthlySheetData.push(['Total', ...monthlyTotals, monthlyTotals.reduce((a, b) => a + b, 0)])
// const monthlySheet = XLSX.utils.aoa_to_sheet(monthlySheetData)
// // monthlySheet['!cols'] = [{ wpx: 80 }]
// // monthlySheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 32 } }]
// XLSX.utils.book_append_sheet(wb, monthlySheet, 'Monthly Data')

// XLSX.writeFile(wb, 'chart_report.xlsx')

const printData = () => {
  const data = []

  const maxYearColumns = yearlyCategory.value.length
  const maxMonthColumns = monthlyCategory.value.length


  const yearlyTempData = JSON.parse(JSON.stringify(yearlyData.value))
  const monthlyTempData = JSON.parse(JSON.stringify(monthlyData.value))

  console.log(yearlyTempData, monthlyTempData)
  yearlyTempData.forEach((item) => {
    item.data = item.data.slice(1)
  })

  monthlyTempData.forEach((item) => {
    item.data = item.data.slice(1)
  })

  const yearlyCategories = yearlyCategory.value.slice(1)
  const yearlyTableData = [['Bulan', ...yearlyCategories, 'Total']]
  const yearlyTotals = new Array(maxYearColumns - 1).fill(0)
  data.push([])

  yearlyTempData.forEach((item) => {
    const rowData = [`${item.name}`]
    let total = 0
    item.data.forEach((value, colIndex) => {
      rowData.push(`${value}`)
      total += value
      yearlyTotals[colIndex] += value
    })
    rowData.push(`${total}`)
    yearlyTableData.push(rowData)
  })

  yearlyTableData.push(['Total', ...yearlyTotals, yearlyTotals.reduce((a, b) => a + b, 0)])

  const yearlyTable = document.createElement('table')
  yearlyTable.border = '1'
  yearlyTable.style.width = '100%'

  yearlyTableData.forEach((rowData) => {
    const row = yearlyTable.insertRow()
    rowData.forEach((cellData, index) => {
      const cell = row.insertCell()
      cell.innerHTML = cellData.content || cellData
      cell.style.cssText = cellData.style || ''
      if (index > 0) {
        cell.style.textAlign = 'center'
      }
    })
  })

  const monthlyTable = document.createElement('table')
  monthlyTable.border = '1'
  monthlyTable.style.width = '100%'

  const monthlyCategories = monthlyCategory.value.slice(1)
  const monthlyTableData = [['Tanggal', ...monthlyCategories, 'Total']]
  const monthlyTotals = new Array(maxMonthColumns - 1).fill(0)
  data.push([])

  monthlyTempData.forEach((item) => {
    const rowData = [`${item.name}`]
    let total = 0
    item.data.forEach((value, colIndex) => {
      rowData.push(`${value}`)
      total += value
      monthlyTotals[colIndex] += value
    })
    rowData.push(`${total}`)
    monthlyTableData.push(rowData)
  })

  monthlyTableData.push(['Total', ...monthlyTotals, monthlyTotals.reduce((a, b) => a + b, 0)])

  monthlyTableData.forEach((rowData) => {
    const row = monthlyTable.insertRow()
    rowData.forEach((cellData, index) => {
      const cell = row.insertCell()
      cell.innerHTML = cellData.content || cellData
      cell.style.cssText = cellData.style || ''
      if (index > 0) {
        cell.style.textAlign = 'center'
      }
    })
  })

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

  yearContainer.appendChild(yearlyTable)
  monthContainer.appendChild(monthlyTable)
  const win = window.open('', '', 'fullscreen=yes')
  console.log('Test')
  win.document.write('<html><head><title>Data Tingkat Keramaian</title></head><body>')
  win.document.write(
    `<h1 style="text-align: center;">Data Tingkat Keramaian Tahun ${selectedYear.value}</h1>`
  )
  win.document.write(yearContainer.outerHTML)
  win.document.write(
    `<h1 style="text-align: center;">Data Tingkat Keramaian Bulan ${selectedMonthName.value}</h1>`
  )
  win.document.write(monthContainer.outerHTML)
  win.document.write('</body></html>')
  win.window.print()
  win.document.close()

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
    const response = await fetch(
      `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/target-revenue/year`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    if (!targetYears.value.includes(currentYear)) {
      targetYears.value.push(currentYear)
    }
    targetYears.value = res.data
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
    const res = await response.json()
    yearlyCategory.value = res.data.yearlyCategory
    yearlyData.value = res.data.yearlyData
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchTargetMonths = async () => {
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/target-revenue/month`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
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

    const formattedMonths = res.data.map((month) => {
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

    const monthIndex = monthNames.indexOf(monthName)

    if (monthIndex !== -1) {
      selectedMonth.value = monthIndex + 1
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
    const res = await response.json()
    monthlyCategory.value = res.data.monthlyCategory
    monthlyData.value = res.data.monthlyData
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

/* TableReport Helper */
const activityReportData = ref([])
const category = ref('')

const updateCategory = (value) => {
  category.value = value[0].name
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
    const res = await response.json()
    if (res.data) activityReportData.value = res.data.slice(0, 200)
  } catch (error) {
    console.error('Error fetching data Report:', error)
  }
}

/* TicketInfoCard Helper */
const orderInfoCardData = ref([])
const totalSum = () => {
  return orderInfoCardData.value.reduce((total, item) => {
    return total + item.amount
  }, 0)
}

const fetchOrderInfoCardData = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/recent-purchase`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    orderInfoCardData.value = res.data
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
  revenueKeraton,
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
  totalSum,
  fetchOrderInfoCardData
}
