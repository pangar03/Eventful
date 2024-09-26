import EventPageDetails, {Attribute as EventPageAttribute} from "./components/eventPageDetails/eventPageDetails";

import * as components from './components/indexPadre';
import Post, { Attribute as PostAttribute } from './components/normal-post/normal-post';
import { posts } from './data/data';

class AppContainer extends HTMLElement {
    normalpost: Post[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
// [
//             normalPosts.forEach((user) => { 
//                 const post = new Post();
//                 post.setAttribute(Attribute.profileimg, user.profileimg);
//                 post.setAttribute(Attribute.username, user.username);
//                 post.setAttribute(Attribute.posttext, user.posttext);
//                 post.setAttribute(Attribute.postimg, user.postimg);
//                 post.setAttribute(Attribute.likes, user.likes.toString());
//                 this.normalpost.push(post);
//                 this.shadowRoot?.appendChild(post); 
//             });]
        
    }

    connectedCallback() {
        this.render();
        // console.log(this.normalpost);
        
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/indexAbuelo.css">`;
        }

        // BEGIN TESTING

        // TEST EVENT-PAGE-DETAILS

        // const container = this.ownerDocument.createElement('main');
        // const eventPageDetails = this.ownerDocument.createElement('event-page-details') as EventPageDetails;
        // eventPageDetails.setAttribute(Attribute.eventtitle, 'Event Title');
        // eventPageDetails.setAttribute(Attribute.image, 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        // eventPageDetails.setAttribute(Attribute.location, 'Event Location');
        // eventPageDetails.setAttribute(Attribute.date, 'Event Date');
        // eventPageDetails.setAttribute(Attribute.creator, 'Event Creator');
        // eventPageDetails.setAttribute(Attribute.attendants, String(3));
        // eventPageDetails.setAttribute(Attribute.maxattendants, String(15));
        // eventPageDetails.setAttribute(Attribute.description, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
        // eventPageDetails.setAttribute(Attribute.isattending, String(true));

        // container.appendChild(eventPageDetails);
        // this.shadowRoot?.appendChild(container);
        if (this.shadowRoot) {
            
        }
    }
}

customElements.define('app-container', AppContainer);
