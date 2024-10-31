import { reducer } from "./reducer";

import Storage from "../utils/storage";
import { AppState, Observer, Screens } from "../types/store";
import { getFirebaseInstance } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { navigate, setUserCredentials } from "./actions";

const initialState: AppState = {
    screen: 'REGISTER',
    normalPosts: [],
    eventPosts: [],
    eventUID: 1,
    user: '',
};

const onAuth = async () => {
	const { auth } = await getFirebaseInstance();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			user.uid !== null ? dispatch(setUserCredentials(user.uid)) : ''; //Es la que se encarga de guardar el id del usuario
			dispatch(navigate(Screens.DASHBOARD)); //Esta es la de navegar a dashboard
		} else {
			dispatch(navigate(Screens.LOGIN));
		}
	});
};

onAuth();


export let appState = initialState;

let observers: Observer[] = [];

// Dispatch
export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    
    appState = newState;

	observers.forEach((o: any) => o.render());
};

// Add Observers
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};