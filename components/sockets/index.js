import socketIOClient from 'socket.io-client'
import keys from '../../config/keys'
const socket = socketIOClient(keys.socketUrl)

export default socket