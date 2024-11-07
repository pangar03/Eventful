import { appState } from '../../store';
import { getPostById, interactPost } from '../../utils/firebase';
import Styles from './eventPageDetails.css';

export enum Attribute {
    "uid" = "uid",
    "image" = "image",
    "eventtitle" = "eventtitle",
    "location" = "location",
    "date" = "date",
    "creator" = "creator",
    "maxattendants" = "maxattendants",
    "description" = "description",
}

class EventPageDetails extends HTMLElement {
    eventData?: any;
    uid?: number;
    image?: string;
    eventtitle?: string;
    location?: string;
    date?: string;
    creator?: string;
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
            case Attribute.maxattendants:
                this.maxattendants = newValue ? Number(newValue) : undefined;
                break;
            
            case Attribute.uid:
                this.uid = newValue ? Number(newValue) : undefined;
                break;

            default:
                this[propName] = newValue;
                break;
        }
    }
    
    async connectedCallback() {
        this.eventData = await getPostById(String(this.uid)!);
        this.eventData.attendants.find((attendant: any) => attendant.uid === appState.user) ? this.isattending = true : this.isattending = false;
        
        console.log(this.isattending);
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <section class="event-page">
                    <div class="event-page__data">
                        <div class="data__image" style="background-image: url('${this.image || 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-acampada-de-otono.png'}');"></div>
                        <div class="data__info">
                            <h1 class="event-indicator">Event</h1>
                            <h1 class="info__text" id="event-title">${this.eventtitle}</h1>
                            <h2>Location</h2>
                            <h3 class="info__text">${this.location}</h3>
                            <h2>Date</h2>
                            <h3 class="info__text">${this.date}</h3>
                            <h2>Creator</h2>
                            <h3 class="info__text">${this.creator}</h3>
                            <h2>Attendants</h2>
                            <h3 class="attendants info__text">${this.eventData.attendants.length}/${this.maxattendants}</h3>
                        </div>
                    </div>
                    <div class="event-page__description">
                        <h1>Description</h1>
                        <p class="info__text">${this.description}</p>
                    </div>
                </section>
            `;

            this.addButtons();

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
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
            cancelButton.addEventListener('click', async () => {
                if(this.isattending){
                    this.eventData.attendants = this.eventData.attendants.filter((attendant: any) => attendant !== appState.user);
                    await interactPost(String(this.uid), "attendants", this.eventData.attendants);
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
                    if(this.maxattendants && this.eventData.attendants.length < this.maxattendants){
                        this.eventData.attendants.push(appState.user);
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
    }

    changeAttendants(){
        if(this.shadowRoot?.querySelector('.attendants')){
            this.shadowRoot.querySelector('.attendants')!.textContent = `${this.eventData.attendants.length}/${this.maxattendants}`;
        }    
    }
}

customElements.define('event-page-details', EventPageDetails);
export default EventPageDetails;