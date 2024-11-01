import socketIOClient from 'socket.io-client'
import keys from '../../config/keys'
const socket = socketIOClient("https://staging.unzipped.io/")

export default socket