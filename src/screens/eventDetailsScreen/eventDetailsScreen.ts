import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar"

import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar"

import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";

import EventPageDetails, { Attribute as EventDetailsAttribute} from "../../components/eventPageDetails/eventPageDetails";
import "../../components/eventPageDetails/eventPageDetails"

import { addObserver, appState } from "../../store";
import { getUser } from "../../utils/firebase";

class EventDetailsScreen extends HTMLElement {
    eventId: number = Number(appState.eventUID);

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        const currentUser = await getUser(appState.user);
        const userPosts = appState.normalPosts.filter((post: any) => post.userUID === appState.user);
        const userEvents = appState.eventPosts.filter((event: any) => event.userUID === appState.user);
        const totalPosts = userPosts.length + userEvents.length;
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="app-container">
                    <side-bar profileimg="${currentUser?.profileImg}" username="${currentUser?.username}" numpost="${totalPosts}"></side-bar>
                    <div id="event-details"></div>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;

            const eventDetails = this.shadowRoot.querySelector('#event-details')!;

            const event = appState.eventPosts.find((event: any)  => event.uid === this.eventId);

            const user = await getUser(Object(event).userUID);

            const eventDetailsComponent = document.createElement('event-page-details') as EventPageDetails;
            eventDetailsComponent.setAttribute(EventDetailsAttribute.uid, String(this.eventId) || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.firebaseid, String(event?.firebaseid) || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.image, event?.eventImg || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.eventtitle, event?.eventTitle || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.location, event?.eventLocation || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.date, event?.eventDate || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.description, event?.description || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.creator, user?.username || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.maxattendants, String(event?.maxAttendants) || "");
            eventDetails.appendChild(eventDetailsComponent);
        }
    }
};

customElements.define('event-details-screen', EventDetailsScreen);
export default EventDetailsScreen;