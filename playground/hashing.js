const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const password = 'passowd!'

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash)
//   })
// })

const hashedPassword = '$2a$10$MTRc3E.GKEoCZYZ4As4ejOtjPhjCC2jpFIuslDCepn22mxbf4jKym'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// const data = {
//   id: 10
// }

// const token = jwt.sign(data, 'salt')
// console.log('Token', token)

// const decoded = jwt.verify(token, 'salt')
// console.log('Decoded', decoded)

// const message = 'I am user number 3'
// const hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// const data = {
//   id: 4
// }
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecrete').toString()
// }

// token.data.id = 5
// token.hash = SHA256(JSON.stringify(token.data)).toString()

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecrete').toString()

// const verifyMessage = resultHash === token.hash ? 'Data was not changed' : 'Data was changed. Don\'t trust!'
// console.log(verifyMessage)