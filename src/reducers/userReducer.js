import { UPDATE_USER } from '../actions/userAction'

const userReducer = (state = '', { type, payload }) => {
    switch (type) {
      case UPDATE_USER:
        return payload.userName;
      default: 
        return state
    }
    // return state
  }
export default userReducer