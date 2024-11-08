import { EventPost, NormalPost } from "./post";

export type AppState = {
    screen: string;
    normalPosts: NormalPost[];
    eventPosts: EventPost[];
    eventUID: number;
    user: '';
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
    'NAVIGATE' = 'NAVIGATE',
    'GETPOSTS' = 'GETPOSTS',
    'OPENEVENT' = 'OPENEVENT',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS',
    'CREATEPOST' = 'CREATEPOST',
}

export enum Screens {
    'DASHBOARD' = 'DASHBOARD',
    'DASHBOARDEVENTS' = 'DASHBOARDEVENTS',
    'EVENTDETAILS' = 'EVENTDETAILS',
    'REGISTER' = 'REGISTER',
    'LOGIN' = 'LOGIN',
    'POSTCREATION' = 'POSTCREATION',
}