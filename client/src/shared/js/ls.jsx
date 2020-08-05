
export const LS = () =>{
    let items = {}
    const keys = Object.keys(localStorage);
    keys.forEach( key =>{
      let item = {}
      try {
        item = JSON.parse(localStorage.getItem(key))
      } catch (error) {
        item = localStorage.getItem(key);
      }
      item === 'undefined' ? items[key] = null : items[key] = item
    })
    console.log('[items]', items);
    return items
}
