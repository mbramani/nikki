import { createDecipheriv } from 'crypto'
import configs from '../configs.js'

function decryptData(buffer) {
  const algorithm = 'aes-256-cbc'
  const key = configs.dataEncrypt.secret

  const iv = buffer.slice(0, 16)

  const encrypted = buffer.slice(16)

  const decipher = createDecipheriv(algorithm, key, iv)
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()])

  return result.toString()
}

export default decryptData
