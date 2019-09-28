const userReducer = (state = '', { type, payload }) => {
    switch (type) {
      case 'updateUser':
        return payload;
    }
    return state
  }
export default userReducer