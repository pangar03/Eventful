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
    'OPENPOST' = 'OPENPOST',
}

export enum Screens {
    'DASHBOARD' = 'DASHBOARD',
    'EVENTDETAILS' = 'EVENTDETAILS',
}