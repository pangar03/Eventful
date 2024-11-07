import { dispatch } from "../../store";
import { openEvent } from "../../store/actions";

import Styles from "./eventPostCard.css";

export enum Attribute {
    "uid" = "uid",
    "image" = "image",
    "eventtitle" = "eventtitle",
    "location" = "location",
    "date" = "date",
    "description" = "description",
    "firebaseid" = "firebaseid",
}

class EventPostCard extends HTMLElement {
    uid?: string;
    image?: string;
    eventtitle?: string;
    location?: string;
    date?: string;
    description?: string;
    firebaseid?: string;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(
        propName: Attribute,
        oldValue: string | undefined,
        newValue: string | undefined
    ) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section class="post-card">
                <div class="event-page__data">
                    <div class="data__image" style="background-image: url('${this.image || 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-acampada-de-otono.png'}');"></div>
                    <div class="data__info">
                        <h1 class="event-indicator">Event</h1>
                        <h1 class="info__text" id="event-title">${this.eventtitle}</h1>
                        <h2>Location</h2>
                        <h3 class="info__text">${this.location}</h3>
                        <h2>Date</h2>
                        <h3 class="info__text">${this.date}</h3>
                        <h1>Description</h1>
                        <p class="info__text">${this.description}</p>
                    </div>
                </div>
            </section>
            `;
        }
        
        // Learn More Button
        this.addLearnMoreButton();

        const css = this.ownerDocument.createElement('style');
        css.innerHTML = Styles;
        this.shadowRoot?.appendChild(css);
    }

    addLearnMoreButton() {
        const learnMoreButton = this.ownerDocument.createElement("button");
        learnMoreButton.textContent = "Learn More";
        learnMoreButton.classList.add("learn-more-button");

        learnMoreButton.addEventListener("click", (e) => {
            e.preventDefault();

            console.log("UID", this.uid);            
            dispatch(openEvent(this.uid!));
        });

        const infoContainer = this.shadowRoot?.querySelector(".data__info")?.appendChild(learnMoreButton);
    }
}

customElements.define("event-post-card", EventPostCard);
export default EventPostCard;
