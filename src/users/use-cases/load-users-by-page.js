import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {Numbre} page
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async(page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;

    const res = await fetch(url);
    let data = await res.json();
    data = data.data;
    const users = data.map(userLike => localhostUserToModel(userLike));
    
    return users;
    
} 