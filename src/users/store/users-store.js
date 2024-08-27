import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    curentPage : 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.curentPage + 1);
    if(users.length === 0) return;
    state.curentPage +=1;
    state.users = users;

}

const loadPreviousPage = async() => {
    if(state.curentPage === 1) return;
    const users = await loadUsersByPage(state.curentPage - 1);
    

    state.users = users;
    state.curentPage = state.curentPage -=1;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = (updatedUser) => {
    let wasFound = false;

    state.users = state.users.map (user => {
        if(user.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }

        return user;
    });



    if(state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    } 
}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.curentPage);
    if(users.length === 0) {
        await loadPreviousPage();
        return;
    };
    
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.curentPage,
}