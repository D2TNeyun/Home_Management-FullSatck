import axios from "./customize_axios";
// import { store } from "../Redux/Store/store";

const postCreateNewUser = (email, password, avatar) =>{
    const data = new FormData(); 
    data.append("email", email);
    data.append("password", password);
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

const deleteUser = (id) => {    
    return axios.delete(`/admin/deleteUser/`+id);
}

const postLogin = (email, password) => {    
    return axios.post(`/login`, { email: email, password: password, delay: 10000 });
}

const getAllDpm = () => {
    return axios.get('/dpm/getDpm');
}

const postCreatDpm = ( nameDepartment) =>{
    return axios.post('/dpm/addDpm', { nameDepartment: nameDepartment});
}

const putUpdateDpm = (id, nameDepartment) =>{
    return axios.put('/dpm/updateDpm/'+id, {nameDepartment: nameDepartment});
}

const deleteDpm = (id) => {    
    return axios.delete(`/dpm/deleteDpm/`+id);
}

const getAllTrophy = () => {
    return axios.get('/award/getAllAward');
}

const getAllProject = () => {
    return axios.get('/dtnk/getAll');
}

const getProflie = () => {
    return axios.get('/user/getProfileUser');
}
const putUpdateProfile = (id, position, username, avatar, id_Department) =>{
    const data = new FormData();
    data.append('id', id); 
    data.append("id_Department", id_Department);  // id_Department
    data.append("username", username);
    data.append("position", position);
    data.append("avatar", avatar);
    return axios.put('/user/updateUser/'+id , data)
}

const getAllMyProject = (id_User) => {
    return axios.get(`/dtnk/getAll?id_User=${id_User}` );
}

const postCreateProject = (id_User, nameDtnk, description, img) => {
    const data = new FormData();
    data.append('id_User', id_User);
    data.append("nameDtnk", nameDtnk);
    data.append("description", description);
    data.append("img", img); 
    return axios.post(`/dtnk/create`, data);
}

const postAddAward = (id_user, id_Dtnk, nameAward) => {
    return axios.post('/award/addAward', {id_user, id_Dtnk, nameAward} );
}

const putUpdateAward = (id, nameAward) =>{
    return axios.put('/award/updateAward/'+id, {nameAward: nameAward});
}

const deleteAward = (id) =>{
    return axios.delete('/award/deleteAward/'+id);
}



export {
    postCreateNewUser,
    postLogin,
    getAllUser,
    putUpdateUser,
    getDepartment,
    postCreateProject,
    deleteUser,
    getAllDpm,
    postCreatDpm,
    putUpdateDpm,
    deleteDpm,
    getAllTrophy,
    getAllProject,
    getProflie,
    putUpdateProfile,
    getAllMyProject,
    postAddAward,
    putUpdateAward,
    deleteAward
};