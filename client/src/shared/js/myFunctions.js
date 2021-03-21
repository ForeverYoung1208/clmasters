const timeStrToHours = (timeStrIn) => {
  if (!timeStrIn) return 0
  const hours = +timeStrIn.substring(0, 2)
  const minutes = +timeStrIn.substring(3, 5)
  const totalHours = hours + (minutes / 60) * 100
  return Math.round(totalHours * 100) / 100
}

export { timeStrToHours }
