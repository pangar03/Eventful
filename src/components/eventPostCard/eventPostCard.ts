import EventPageDetails, { Attribute as AttributePageDetails} from "../eventPageDetails/eventPageDetails";

export enum Attribute {
    "uid" = "uid",
    "image" = "image",
    "eventtitle" = "eventtitle",
    "location" = "location",
    "date" = "date",
    "description" = "description",
    "likes" = "likes",
    "creator" = "creator",
    "attendants" = "attendants",
    "maxattendants" = "maxattendants",
    "isattending" = "isattending",
}

class EventPostCard extends HTMLElement {
    uid?: number;
    image?: string;
    eventtitle?: string;
    location?: string;
    date?: string;
    description?: string;
    likes?: number;

    // Conceiled Attributes to build the detail page
    creator?: string;
    attendants?: number;
    maxattendants?: number;
    isattending?: boolean;

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
            case Attribute.uid:
                this.likes = newValue ? Number(newValue) : undefined;
                break;

            case Attribute.likes:
                this.likes = newValue ? Number(newValue) : undefined;
                break;

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
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/src/components/eventPostCard/eventPostCard.css">
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
    }

    addLearnMoreButton() {
        const learnMoreButton = this.ownerDocument.createElement("button");
        learnMoreButton.textContent = "Learn More";
        learnMoreButton.classList.add("learn-more-button");

        learnMoreButton.addEventListener("click", (e) => {
            e.preventDefault();

            const eventDetail = this.renderEventDetail();
        });

        const infoContainer = this.shadowRoot?.querySelector(".data__info")?.appendChild(learnMoreButton);
    }
    
    renderEventDetail() {
        // IN DEVELOPTMENT
        // const eventDetails = this.ownerDocument.createElement("event-page-details") as EventPageDetails;

        // eventDetails.setAttribute(AttributePageDetails.image, this.image?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.eventtitle, this.eventtitle?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.location, this.location?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.date, this.date?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.creator, this.creator?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.attendants,  this.attendants?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.maxattendants,  this.maxattendants?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.description,  this.description?.toString() || "");
        // eventDetails.setAttribute(AttributePageDetails.isattending,  this.isattending?.toString() || "");

        // if(this.shadowRoot){
        //     this.shadowRoot.innerHTML = '';
        //     this.shadowRoot.appendChild(eventDetails);
        // }
    }
}

customElements.define("event-post-card", EventPostCard);
export default EventPostCard;
