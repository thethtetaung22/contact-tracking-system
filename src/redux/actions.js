import { CHECKIN_USER, LOGIN_ADMIN, LOGOUT_ADMIN } from './types';

export const checkInUser = (users) => {
    return {
        type: CHECKIN_USER,
        payload: users
    }
}

export const loginAdmin = () => {
    return {
        type: LOGIN_ADMIN,
    }
}

export const logoutAdmin = () => {
    return {
        type: LOGOUT_ADMIN,
    }
}


