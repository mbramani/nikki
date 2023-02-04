import { randomBytes, createCipheriv } from 'crypto'
import configs from '../configs.js'

function encryptData(text) {
  const algorithm = 'aes-256-cbc'
  const key = configs.dataEncrypt.secret

  const buffer = Buffer.from(text)

  const iv = randomBytes(16)

  const cipher = createCipheriv(algorithm, key, iv)
  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()])

  return result
}

export default encryptData
