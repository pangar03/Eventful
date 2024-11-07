import EventPageDetails, {Attribute as EventPageAttribute} from "../eventPageDetails/eventPageDetails";
import "../eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "../eventPostCard/eventPostCard";
import "../eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from '../normal-post/normal-post';
import '../normal-post/normal-post';

import { posts } from '../../data/data';
import Styles from './dashboard.css';

import { addObserver, appState } from "../../store";
import { getPostsAction } from "../../store/actions";
import { dispatch } from "../../store";

class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    async connectedCallback() {
        if (appState.normalPosts.length === 0 && appState.eventPosts.length === 0) {
			const action = await getPostsAction();
			dispatch(action);
		} else {
			this.render();
		}
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <section class="dashboard"></section>
            `;

            const dashboard = this.shadowRoot.querySelector('.dashboard');
            appState.normalPosts.forEach((post: any) => {
                const postCard = this.ownerDocument.createElement('normal-post') as Post;

                postCard.setAttribute(PostAttribute.uid, String(post.uid) || "");
                postCard.setAttribute(PostAttribute.profileimg, post.profileImg || "");
                postCard.setAttribute(PostAttribute.username, post.username || "");
                postCard.setAttribute(PostAttribute.posttext, post.postText || "");
                postCard.setAttribute(PostAttribute.postimg, post.postImg || "");
                postCard.setAttribute(PostAttribute.likes, String(post.likes) || "");

                dashboard?.appendChild(postCard);
            })
            
            appState.eventPosts.forEach((post: any) => {
                const postCard = this.ownerDocument.createElement('event-post-card') as EventPostCard;
                
                postCard.setAttribute(EventCardAttribute.uid, String(post.uid) || "");
                postCard.setAttribute(EventCardAttribute.image, post.eventImg || "");
                postCard.setAttribute(EventCardAttribute.eventtitle, post.eventTitle || "");
                postCard.setAttribute(EventCardAttribute.location, post.eventLocation || "");
                postCard.setAttribute(EventCardAttribute.date, post.eventDate || "");
                postCard.setAttribute(EventCardAttribute.description, post.description || "");

                dashboard?.appendChild(postCard);
            });      

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
}

customElements.define('dashboard-component', Dashboard);
export default Dashboard;

