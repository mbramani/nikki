import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send({ msg: 'welcome to yokosho' })
})
export default app
