import Dashboard from "../../components/dashboardEvents/dashboardEvents";
import "../../components/dashboardEvents/dashboardEvents"

import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar"

import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar"

import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";
import { addObserver, appState, dispatch } from "../../store";
import { getPostsAction } from "../../store/actions";
import { getUser } from "../../utils/firebase";

class DashboardEventsScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        addObserver(this);
    }

    async connectedCallback() {
        if(appState.normalPosts.length === 0 && appState.eventPosts.length === 0){
            const action = await getPostsAction();
            dispatch(action);
        } else {
            this.render();
        }
    }

    async render() {
        const currentUser = await getUser(appState.user);
        const userPosts = appState.normalPosts.filter((post: any) => post.userUID === appState.user);
        const userEvents = appState.eventPosts.filter((event: any) => event.userUID === appState.user);
        const totalPosts = userPosts.length + userEvents.length;
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div>
                    <side-bar profileimg="${currentUser?.profileImg}" username="${currentUser?.username}" numpost="${totalPosts}"></side-bar>
                    <dashboard-events-component></dashboard-events-component>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;
        }
    }
};

customElements.define('dashboard-events-screen', DashboardEventsScreen);
export default DashboardEventsScreen;