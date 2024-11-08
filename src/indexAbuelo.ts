import "./screens/dashboardScreen/dashboardScreen";
import "./screens/dashboardEventsScreen/dashboardEventsScreen";
import "./screens/eventDetailsScreen/eventDetailsScreen"
import "./screens/registerScreen/registerScreen";
import "./screens/loginScreen/loginScreen";
import "./screens/creationScreen/creationScreen";

import { appState, addObserver } from "./store";
import { Screens } from "./types/store";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
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

                case Screens.DASHBOARDEVENTS:
                    const dashboardEvents = this.ownerDocument.createElement('dashboard-events-screen');
                    this.shadowRoot.appendChild(dashboardEvents);
                    break;
                
                case Screens.EVENTDETAILS:
                    const eventDetails = this.ownerDocument.createElement('event-details-screen');
                    this.shadowRoot.appendChild(eventDetails);
                    break;

                case Screens.REGISTER:
                    const register = this.ownerDocument.createElement('register-screen');
                    this.shadowRoot.appendChild(register);
                    break;
                    
                case Screens.LOGIN:
                    const login = this.ownerDocument.createElement('login-screen');
                    this.shadowRoot.appendChild(login);
                    break;
                
                case Screens.POSTCREATION:
                    const creationScreen = this.ownerDocument.createElement('creation-screen');
                    this.shadowRoot.appendChild(creationScreen);
                    break;
                
                default:
                    break;
            }
        }
    }
}

customElements.define('app-container', AppContainer);
