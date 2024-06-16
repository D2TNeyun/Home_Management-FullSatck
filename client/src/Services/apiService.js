import axios from "./customize_axios";

const postCreateNewUser = (email, password, avatar) =>{
    const data = new FormData(); 
    data.append("email", email);
    data.append("password", password);
    // data.append("username", username);
    // data.append("position", position);
    // data.append("role", role);
    data.append("avatar", avatar);
    return axios.post('/register', data)
}

const getAllUser = () => {
    return axios.get('/admin/getAllUser');
}

const putUpdateUser = (id, position, username, avatar, id_Department) =>{
    const data = new FormData();
    data.append('id', id); 
    data.append("id_Department", id_Department);  // id_Department
    data.append("username", username);
    data.append("position", position);
    data.append("avatar", avatar);
    return axios.put('/admin/updateUser/'+id , data)
}

const getDepartment = () => {
    return axios.get('/dpm/getDpm');
}

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    getDepartment
};