export const pad = (n) => (n < 10 ? '0' : '') + n

export const todayUrl = (date = new Date()) =>
  `/${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}/`

export const yearUrl = (date = new Date()) => `/${date.getFullYear()}/`
