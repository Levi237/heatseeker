export const UPDATE_USER = 'users:updateUser';

export const updateUser = (newUser) => {
    return {
        type: UPDATE_USER,
        payload: {
            userName: newUser
        }
    }
}

// export default updateUser