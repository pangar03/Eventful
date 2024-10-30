import { EventPost, NormalPost } from "./post";

export type AppState = {
    screen: string;
    normalPosts: NormalPost[];
    eventPosts: EventPost[];
    eventUID: number;
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
    'NAVIGATE' = 'NAVIGATE',
    'GETPOSTS' = 'GETPOSTS',
    'OPENEVENT' = 'OPENEVENT',
}

export enum Screens {
    'DASHBOARD' = 'DASHBOARD',
    'EVENTDETAILS' = 'EVENTDETAILS',
    'REGISTER' = 'REGISTER',
    'LOGIN' = 'LOGIN',
}