export enum Attribute {
    "image" = "image",
    "eventtitle" = "eventtitle",
    "location" = "location",
    "date" = "date",
    "creator" = "creator",
    "attendants" = "attendants",
    "maxattendants" = "maxattendants",
    "description" = "description",
    "isattending" = "isattending",
}

class EventPageDetails extends HTMLElement {
    image?: string;
    eventtitle?: string;
    location?: string;
    date?: string;
    creator?: string;
    attendants?: number;
    maxattendants?: number;
    description?: string;
    isattending?: boolean;
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){
        switch(propName){
            case Attribute.attendants:
                this.attendants = newValue ? Number(newValue) : undefined;
                break;
            
            case Attribute.maxattendants:
                this.maxattendants = newValue ? Number(newValue) : undefined;
                break;
            
            case Attribute.isattending:
                this.isattending = newValue ? Boolean(newValue) : undefined;
                break;

            default:
                this[propName] = newValue;
                break;
        }

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/components/eventPageDetails/eventPageDetails.css">
                <section class="event-page">
                    <div class="event-page__data">
                        <div class="data__image"></div>
                        <div class="data__info">
                            <h1 class="event-indicator">Event</h1>
                            <h1 class="info__text">${this.eventtitle}</h1>
                            <h2>Location</h2>
                            <h3 class="info__text">${this.location}</h3>
                            <h2>Date</h2>
                            <h3 class="info__text">${this.date}</h3>
                            <h2>Creator</h2>
                            <h3 class="info__text">${this.creator}</h3>
                            <h2>Attendants</h2>
                            <h3 class="attendants info__text">${this.attendants}/${this.maxattendants}</h3>
                        </div>
                    </div>
                    <div class="event-page__description">
                        <h1>Description</h1>
                        <p class="info__text">${this.description}</p>
                    </div>
                </section>
            `;

            this.addButtons();
        }
    }

    addButtons(){
        const eventPage = this.shadowRoot?.querySelector('.event-page');
        if(eventPage){
            // Cancel Button
            const cancelButton = this.ownerDocument.createElement('button');
            cancelButton.textContent = 'Cancel Attendance';
            cancelButton.classList.add('event-page__button');
            cancelButton.classList.add('button-cancel');
            cancelButton.addEventListener('click', () => {
                if(this.isattending){
                    this.attendants = this.attendants ? this.attendants - 1 : undefined;
                    this.changeStatus();
                }
            });
            
            // Confirm Button
            const confirmButton = this.ownerDocument.createElement('button');
            confirmButton.textContent = 'Confirm Attendance';
            confirmButton.classList.add('event-page__button');
            confirmButton.classList.add('button-confirm');
            confirmButton.addEventListener('click', () => {
                if(!this.isattending){
                    if(this.attendants && this.maxattendants && this.attendants < this.maxattendants){
                        this.attendants = this.attendants + 1;
                        this.changeStatus();
                    }
                }
            });

            this.isattending ? cancelButton.classList.add('button-cancel--active') : confirmButton.classList.add('button-confirm--active');

            // Buttons Container
            const buttonsContainer = this.ownerDocument.createElement('div');
            buttonsContainer.classList.add('event-page__buttons');

            // Add Buttons to the container
            buttonsContainer.appendChild(cancelButton);
            buttonsContainer.appendChild(confirmButton);

            // Add the container to the eventPage Section
            eventPage.appendChild(buttonsContainer);
        }
    }

    changeStatus(){
        this.isattending = this.isattending ? !this.isattending : true;
        this.shadowRoot?.querySelector('.button-cancel')?.classList.toggle('button-cancel--active');
        this.shadowRoot?.querySelector('.button-confirm')?.classList.toggle('button-confirm--active');
        this.changeAttendants();
        console.log('Status Changed!!');
        console.log(this.isattending);
        console.log(this.attendants);
    }

    changeAttendants(){
        if(this.shadowRoot?.querySelector('.attendants')){
            this.shadowRoot.querySelector('.attendants')!.textContent = `${this.attendants}/${this.maxattendants}`;
        }    
    }
}

customElements.define('event-page-details', EventPageDetails);
export default EventPageDetails;