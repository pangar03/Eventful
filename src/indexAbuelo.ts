import EventPageDetails, {Attribute} from "./components/eventPageDetails/eventPageDetails";

class AppContainer extends HTMLElement {
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

        const container = this.ownerDocument.createElement('main');
        const eventPageDetails = this.ownerDocument.createElement('event-page-details') as EventPageDetails;
        eventPageDetails.setAttribute(Attribute.eventtitle, 'Event Title');
        eventPageDetails.setAttribute(Attribute.location, 'Event Location');
        eventPageDetails.setAttribute(Attribute.date, 'Event Date');
        eventPageDetails.setAttribute(Attribute.creator, 'Event Creator');
        eventPageDetails.setAttribute(Attribute.attendants, String(3));
        eventPageDetails.setAttribute(Attribute.maxattendants, String(15));
        eventPageDetails.setAttribute(Attribute.description, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
        eventPageDetails.setAttribute(Attribute.isattending, String(true));

        container.appendChild(eventPageDetails);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('app-container', AppContainer);
