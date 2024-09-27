import EventPageDetails, {Attribute as EventPageAttribute} from "./components/eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "./components/eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from './components/normal-post/normal-post';


import { posts } from './data/data';

import * as components from './components/indexPadre';
import Dashboard from "./components/dashboard/dashboard";

class AppContainer extends HTMLElement {
    normalpost: Post[] = [];
    eventPost: EventPostCard[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const normalPost = posts.filter((post) => !post.isEvent);
        console.log('normalPost', normalPost);

        const eventPost = posts.filter((post) => post.isEvent);
        console.log('eventPost', eventPost);

        normalPost.forEach((post) => {
            const postCard = this.ownerDocument.createElement('normal-post') as Post;
                postCard.setAttribute(PostAttribute.profileimg, post.profileImg || "");
                postCard.setAttribute(PostAttribute.username, post.username || "");
                postCard.setAttribute(PostAttribute.posttext, post.postText || "");
                postCard.setAttribute(PostAttribute.postimg, post.postImg || "");
                postCard.setAttribute(PostAttribute.likes, String(post.likes) || "");
                console.log('post', postCard);
                this.normalpost.push(postCard);
        })
        
        eventPost.forEach((post) => {
            const postCard = this.ownerDocument.createElement('event-post-card') as EventPostCard;
            postCard.setAttribute(EventCardAttribute.image, post.eventImg || "");
            postCard.setAttribute(EventCardAttribute.eventtitle, post.eventTitle || "");
            postCard.setAttribute(EventCardAttribute.location, post.eventLocation || "");
            postCard.setAttribute(EventCardAttribute.date, post.eventDate || "");
            postCard.setAttribute(EventCardAttribute.description, post.description || "");
            postCard.setAttribute(EventCardAttribute.likes, String(post.likes) || "");
            postCard.setAttribute(EventCardAttribute.creator, post.creator || "");
            postCard.setAttribute(EventCardAttribute.attendants, String(post.attendants) || "");
            postCard.setAttribute(EventCardAttribute.maxattendants, String(post.maxAttendants) || "");
            postCard.setAttribute(EventCardAttribute.isattending, String(post.isAttending) || "");
            this.eventPost.push(postCard);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/indexAbuelo.css">
                <h1>APP CONTAINER</h1>
                <section class='dashboard'></section>`;
                
        }


        if(this.shadowRoot){
            const dashboard = this.shadowRoot.querySelector('.dashboard');
            if(dashboard){
                this.normalpost.forEach((post) => {
                    dashboard.appendChild(post);
                });
                this.eventPost.forEach((post) => {
                    dashboard.appendChild(post);
                });
            }
        }
    }
}

customElements.define('app-container', AppContainer);


