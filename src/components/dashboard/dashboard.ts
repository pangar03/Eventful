import EventPageDetails, {Attribute as EventPageAttribute} from "../eventPageDetails/eventPageDetails";
import "../eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "../eventPostCard/eventPostCard";
import "../eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from '../normal-post/normal-post';
import '../normal-post/normal-post';

import { posts } from '../../data/data';
import Styles from './dashboard.css';

import { appState } from "../../store";
import { getPosts } from "../../store/actions";
import { dispatch } from "../../store";

class Dashboard extends HTMLElement {
    normalpost: Post[] = [];
    eventPost: EventPostCard[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        dispatch(getPosts()); // Update the posts from the store

        const normalPostData = appState.normalPosts;

        const eventPostData = appState.eventPosts;

        normalPostData.forEach((post: any) => {
            const postCard = this.ownerDocument.createElement('normal-post') as Post;
                postCard.setAttribute(PostAttribute.uid, String(post.uid) || "");
                postCard.setAttribute(PostAttribute.profileimg, post.profileImg || "");
                postCard.setAttribute(PostAttribute.username, post.username || "");
                postCard.setAttribute(PostAttribute.posttext, post.postText || "");
                postCard.setAttribute(PostAttribute.postimg, post.postImg || "");
                postCard.setAttribute(PostAttribute.likes, String(post.likes) || "");
                this.normalpost.push(postCard);
        })
        
        eventPostData.forEach((post: any) => {
            const postCard = this.ownerDocument.createElement('event-post-card') as EventPostCard;
            
            postCard.setAttribute(EventCardAttribute.uid, String(post.uid) || "");
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

        this.render();
        
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <section class="dashboard"></section>
            `;

            const dashboard = this.shadowRoot.querySelector('.dashboard');
            if(dashboard){
                this.normalpost.forEach((post) => {
                    dashboard.appendChild(post);
                });
                this.eventPost.forEach((post) => {
                    dashboard.appendChild(post);
                });
            }

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
}

customElements.define('dashboard-component', Dashboard);
export default Dashboard;

