import { reducer } from "./reducer";

import Storage from "../utils/storage";
import { AppState, Observer } from "../types/store";

const initialState: AppState = {
    screen: 'DASHBOARD',
    normalPosts: [],
    eventPosts: [],
    eventUID: 1,
};

export let appState = Storage.get('STORE', initialState);

let observers: Observer[] = [];

const persistStorage = (state: any) => {
    Storage.set('STORE', state);
};

// Dispatch
export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    
    appState = newState;

    persistStorage(newState);
    observers.forEach(observer => observer.render());
};

// Add Observers
export const addObserver = (ref: any) => {
    observers = [...observers, ref];
}