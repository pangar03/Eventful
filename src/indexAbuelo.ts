import "./screens/dashboardScreen/dashboardScreen";
import "./screens/eventDetailsScreen/eventDetailsScreen"

import { appState, addObserver } from "./store";
import { Screens } from "./types/store";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            switch(appState.screen){
                case Screens.DASHBOARD:
                    const dashboard = this.ownerDocument.createElement('dashboard-screen');
                    this.shadowRoot.appendChild(dashboard);
                    break;
                
                case Screens.EVENTDETAILS:
                    const eventDetails = this.ownerDocument.createElement('event-details-screen');
                    this.shadowRoot.appendChild(eventDetails);
                    break;

                case Screens.REGISTER:
                    const register = this.ownerDocument.createElement('register-form');
                    this.shadowRoot.appendChild(register);
                    break;
                
                default:
                    break;
            }
        }

        // Renderizar el rightSidebar en el contenedor correspondiente
        // const sidebar = this.shadowRoot?.querySelector('.sidebar')!;
        // this.rightSidebar.forEach((card) => {
        //     sidebar.appendChild(card);
        // });

        // const mobNavBar = this.shadowRoot?.querySelector('.mobile-navbar')!;
        // const mobileSidebar = this.ownerDocument.createElement('mobile-bar') as MobileSidebar;

        // const chatBarInstance = this.ownerDocument.createElement('chat-bar') as chatBar;
        // chatBarInstance.setAttribute(ChatBarAttribute.editicon, 'https://img.icons8.com/?size=100&id=86376&format=png&color=E8EDFF8F');

        // const chatContainer = this.shadowRoot?.querySelector('.chat-container');
        // chatContainer?.appendChild(chatBarInstance);
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
