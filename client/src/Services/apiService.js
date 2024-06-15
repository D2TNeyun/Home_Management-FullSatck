import axios from "./customize_axios";

const postCreateNewUser = (email, password, avatar) =>{
    const data = new FormData(); 
    data.append("email", email);
    data.append("password", password);
    // data.append("username", username);
    // data.append("position", position);
    // data.append("role", role);
    data.append("avatar", avatar, avatar.name);
    return axios.post('/register', data)
}

const getAllUser = () => {
    return axios.get('/admin/getAllUser');
}

export {
    postCreateNewUser,
    getAllUser,
};