import chatBar, { Attribute as ChatBarAttribute } from './components/chatBar/chatBar';
import EventPageDetails, {Attribute as EventPageAttribute} from "./components/eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "./components/eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from './components/normal-post/normal-post';


import { posts } from './data/data';

import Dashboard from "./components/dashboard/dashboard";

import * as components from './components/indexPadre';
import sideBar, { Attribute as SidebarAttribute } from './components/rightSidebar/rightSidebar';
import MobileSidebar from './components/mobile_rightSidebar/mobile_rightSidebar';

class AppContainer extends HTMLElement {
    normalpost: Post[] = [];
    eventPost: EventPostCard[] = [];

    rightSidebar: sideBar[] = [];
    mobileSidebar?: MobileSidebar[] = []; 

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

        const rightSidebar = this.ownerDocument.createElement('side-bar') as sideBar; // Cambiado a 'side-bar'
        rightSidebar.setAttribute(SidebarAttribute.eventful, 'Eventful');
        rightSidebar.setAttribute(SidebarAttribute.profileimg, 'https://curicum.de/wp-content/uploads/2019/08/curicum_26_3.jpg');
        rightSidebar.setAttribute(SidebarAttribute.username, 'James Robertson');
        rightSidebar.setAttribute(SidebarAttribute.numpost, '12');
        rightSidebar.setAttribute(SidebarAttribute.friends, '132'); // Asegúrate de que este valor sea correcto
        this.rightSidebar.push(rightSidebar);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/styles.css">
                <section class='screen-container'>
                    <nav class='navbar'></nav>
                    <main class='dashboard'></main>
                    <div class="chat-container"></div>
                    <nav class='mobile-navbar'></nav>
                </section>
                `;
                
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

        const navBar = this.shadowRoot?.querySelector('.mobile-navbar')!;
        this.rightSidebar.forEach((card) => {
            navBar.appendChild(card);
        });
        
        const mobNavBar = this.shadowRoot?.querySelector('.navbar')!;
        const mobileSidebar = this.ownerDocument.createElement('mobile-side-bar') as MobileSidebar;
        mobNavBar.appendChild(mobileSidebar);

        const chatBarInstance = this.ownerDocument.createElement('chat-bar') as chatBar;
            
        // Establecer el atributo editicon
        chatBarInstance.setAttribute(ChatBarAttribute.editicon, 'https://img.icons8.com/?size=100&id=86376&format=png&color=E8EDFF8F');

        // Agregar el chatBar al contenedor
        const chatContainer = this.shadowRoot?.querySelector('.chat-container');
        chatContainer?.appendChild(chatBarInstance);
    }
}

customElements.define('app-container', AppContainer);


