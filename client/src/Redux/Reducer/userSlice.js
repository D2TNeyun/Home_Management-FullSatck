import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: "",
        email: "",
        username: "",
        avatar: "",
        position: "",
        id_Department: "",
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            console.log('checkLoginSuccess', action);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = {
                id: "",
                email: "",
                username: "",
                avatar: "",
                position: "",
                id_Department: "",
            };
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { loginSuccess, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
