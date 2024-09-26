import EventPageDetails, {Attribute as EventPageAttribute} from "../eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "../eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from '../normal-post/normal-post';

import { posts } from '../../data/data';

class Dashboard extends HTMLElement {
    normalpost: Post[] = [];
    eventPost: EventPostCard[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        this.normalpost = posts.map((post) => {
            if(!post.isEvent){
                const postCard = this.ownerDocument.createElement('normal-post') as Post;

                postCard.setAttribute(PostAttribute.profileimg, post.profileImg || "");
                postCard.setAttribute(PostAttribute.username, post.username || "");
                postCard.setAttribute(PostAttribute.posttext, post.postText || "");
                postCard.setAttribute(PostAttribute.postimg, post.postImg || "");
                postCard.setAttribute(PostAttribute.likes, String(post.likes) || "");
                return postCard;
            }
        }).filter((post): post is Post => post !== undefined);
        
        this.eventPost = posts.map((post) => {
            if(post.isEvent){
                const postCard = this.ownerDocument.createElement('normal-post') as EventPostCard;

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
                return postCard;
            }
        }).filter((post): post is EventPostCard => post !== undefined);
        
        this.initialRender();
    }

    render() {
        console.log("FLAG!!")
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/components/dashboard/dashboard.css">
                <section class="dashboard"></section>
            `;
        } 
    }

    initialRender() {
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

customElements.define('dashboard-component', Dashboard);
export default Dashboard;