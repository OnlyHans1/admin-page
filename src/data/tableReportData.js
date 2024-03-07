import { ref} from 'vue';

const activityReportData = ref([]);

const fetchDataReport = async (filteredCategory) => {
  try {
    let url = 'http://localhost:3000/report';
    if (filteredCategory) {
      url += `?category=${filteredCategory}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data Report');
    }
    const data = await response.json();
    // Mengatur nilai activityReportData dengan hasil dari API
    activityReportData.value = data;
  } catch (error) {
    console.error('Error fetching data Report:', error);
  }
};

export default {
  activityReportData,
  fetchDataReport
};