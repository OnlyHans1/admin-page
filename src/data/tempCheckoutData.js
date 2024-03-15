const getItemsFromLocalStorage = () => {
    const savedItems = localStorage.getItem('selectedItems');
    if (savedItems) {
      return JSON.parse(savedItems);
    }
    return [];
  };
  
  // Contoh penggunaan
  const itemsFromLocalStorage = getItemsFromLocalStorage();

  export default {
    getItemsFromLocalStorage,
    itemsFromLocalStorage
  }