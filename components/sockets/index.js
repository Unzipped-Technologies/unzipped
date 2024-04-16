import socketIOClient from 'socket.io-client'
import keys from '../../config/keys'
// Below console is added to check the socket URL for debugging....
console.log('keys', keys.socketUrl)
console.log('MONGO_URI', keys?.MONGO_URI, keys?.mongoURI)
console.log('process.env', process.env)
const socket = socketIOClient(keys.socketUrl)

export default socket
