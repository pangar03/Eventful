import { Actions } from "../types/store";

export const navigate = (screen: string) => {
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    }
};

export const getPosts = () => {
    // GET PRODUCT DATA
    return {
        action: Actions.GETPOSTS,
        payload: null, // REPLACE WITH DATA
    }
};

export const openEvent = (uid: number) => {
    return {
        action: Actions.OPENPOST,
        payload: uid,
    }
};