import { Actions } from "../types/store";
import { getPosts } from "../utils/firebase";

export const navigate = (screen: string) => {
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    }
};

export const getPostsAction = async () => {
    const data = await getPosts();
    return {
        action: Actions.GETPOSTS,
        payload: data,
    }
};

export const openEvent = (uid: number) => {
    return {
        action: Actions.OPENEVENT,
        payload: uid,
    }
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};