function formatDate(d = new Date()) {
  let month = (d.getMonth() + 1).toString()
  let day = d.getDate().toString()
  const year = d.getFullYear().toString()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return `${day}-${month}-${year}`
}

export default formatDate
