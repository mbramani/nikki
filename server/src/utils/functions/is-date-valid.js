/* eslint-disable no-restricted-globals */
function isDateValid({ day, month, year }) {
  const date = new Date(`${year}-${month}-${day}`)
  if (isNaN(date)) {
    return false
  }

  const dateMonth = date.getMonth() + 1
  if (dateMonth !== parseInt(month, 10)) {
    return false
  }
  return true
}

export default isDateValid
