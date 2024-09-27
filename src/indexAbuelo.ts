import EventPageDetails, {Attribute as EventPageAttribute} from "./components/eventPageDetails/eventPageDetails";
import EventPostCard, {Attribute as EventCardAttribute} from "./components/eventPostCard/eventPostCard";
import Post, { Attribute as PostAttribute } from './components/normal-post/normal-post';

import { posts } from './data/data';

import * as components from './components/indexPadre';

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
    }
}

customElements.define('app-container', AppContainer);
