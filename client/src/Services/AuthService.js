import axios from "./customize_axios";

const fetchProfile = async () => {
    
    let getUser = await axios.get("http://localhost:3037/getProfile");
    return getUser;
}



const logoutApi = async () => {
    return axios.get("http://localhost:3037/logout")
}

export default {
    fetchProfile,
    logoutApi
};