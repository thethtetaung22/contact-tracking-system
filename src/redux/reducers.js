import { CHECKIN_USER, initialAdminLogin, LOGIN_ADMIN, LOGOUT_ADMIN } from "./types";

const reducer = (state = initialAdminLogin, action) => {
    switch (action.type) {
        case LOGIN_ADMIN: return {
            ...state,
            isAdminLoggedIn: true
        };
        case LOGOUT_ADMIN: return {
            ...state,
            isAdminLoggedIn: false
        };
        case CHECKIN_USER: return {
            ...state,
            checkedInUsers: action.payload
        }
        default: return state;
    }
}

export default reducer;
