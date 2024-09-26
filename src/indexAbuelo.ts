import EventPageDetails, {Attribute as EventPageAttribute} from "./components/eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "./components/eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from './components/normal-post/normal-post';
import Dashboard from './components/dashboard/dashboard';

import { posts } from './data/data';

import * as components from './components/indexPadre';

class AppContainer extends HTMLElement {
    normalpost: Post[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/indexAbuelo.css">`;
        }

        // Adding the dashboard component
        const dashboard = this.ownerDocument.createElement('dashboard-component') as Dashboard;
        console.log("FLAG!");
        console.log(dashboard);
        this.shadowRoot?.appendChild(dashboard);
    }
}

customElements.define('app-container', AppContainer);
