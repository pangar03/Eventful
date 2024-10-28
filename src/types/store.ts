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
    'LIKEPOST' = 'LIKEPOST',
    'CONFIRMATTENDANCE' = 'CONFIRMATTENDANCE',
    'CANCELATTENDANCE' = 'CANCELATTENDANCE',
}

export enum Screens {
    'DASHBOARD' = 'DASHBOARD',
    'EVENTDETAILS' = 'EVENTDETAILS',
}