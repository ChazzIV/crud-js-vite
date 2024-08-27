import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {String|Numbre} id
 * @returns {Promise<User>}
 */
export const getUserById = async(id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

    const res = await fetch(url);
    let data = await res.json();
    // data = data.data;
    const user = localhostUserToModel(data);
    
    return user;
} 