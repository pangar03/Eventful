import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar"

import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar"

import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";

import EventPageDetails, { Attribute as EventDetailsAttribute} from "../../components/eventPageDetails/eventPageDetails";
import "../../components/eventPageDetails/eventPageDetails"

import { addObserver, appState } from "../../store";

class EventDetailsScreen extends HTMLElement {
    eventId: number = appState.eventUID;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="app-container">
                    <side-bar></side-bar>
                    <div id="event-details"></div>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;

            const eventDetails = this.shadowRoot.querySelector('#event-details')!;

            const event = appState.eventPosts.find((event: any)  => event.uid === this.eventId);

            const eventDetailsComponent = document.createElement('event-page-details') as EventPageDetails;
            eventDetailsComponent.setAttribute(EventDetailsAttribute.image, event?.eventImg || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.eventtitle, event?.eventTitle || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.location, event?.eventLocation || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.date, event?.eventDate || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.description, event?.description || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.creator, event?.creator || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.attendants, String(event?.attendants) || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.maxattendants, String(event?.maxAttendants) || "");
            eventDetailsComponent.setAttribute(EventDetailsAttribute.isattending, String(event?.isAttending) || "");
            eventDetails.appendChild(eventDetailsComponent);
        }
    }
};

customElements.define('event-details-screen', EventDetailsScreen);
export default EventDetailsScreen;