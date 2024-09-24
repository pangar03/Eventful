import * as components from './components/indexPadre';
import Post, { Attribute } from './components/normal-post/normal-post';
import { normalPosts } from './data/data';

class AppContainer extends HTMLElement {
    normalpost: Post[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        normalPosts.forEach((user) => { 
            const post = new Post();
            post.setAttribute(Attribute.profileimg, user.profileimg);
            post.setAttribute(Attribute.username, user.username);
            post.setAttribute(Attribute.posttext, user.posttext);
            post.setAttribute(Attribute.postimg, user.postimg);
            post.setAttribute(Attribute.likes, user.likes.toString());
            this.normalpost.push(post);
            this.shadowRoot?.appendChild(post); // Agregar el post aquí
        });
    }

    connectedCallback() {
        // No es necesario llamar a render aquí, ya que ya se han agregado los posts
    }

    render() {
        // Este método no es necesario si no se va a utilizar
    }
}

customElements.define('app-container', AppContainer);
