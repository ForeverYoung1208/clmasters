const notInPast = (dateStr) => {
  const inDate = new Date(dateStr) 
  const now = new Date()
  if (inDate < now) throw new Error('Order date can\'t be in the past ')
  return true
}

module.exports = {
  notInPast,
}