const getItemsFromSessionStorage = () => {
  const savedItems = sessionStorage.getItem('selectedItems')
  if (savedItems) {
    return JSON.parse(savedItems)
  }
  return []
}

export default {
  getItemsFromSessionStorage
}
