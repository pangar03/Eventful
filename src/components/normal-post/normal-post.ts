import { appState } from "../../store";
import { interactPost } from "../../utils/firebase";
import styles from "./normal-post.css";
export enum Attribute {
    "uid" = "uid",
    "profileimg" = "profileimg",
    "username" = "username",
    "posttext" = "posttext",
    "postimg" = "postimg",
    "firebaseid" = "firebaseid",
}

class Post extends HTMLElement {
    postData?: any;
    uid?: number;
    firebaseid?: string;
    profileimg?: string;
    username?: string;
    posttext?: string;
    postimg?: string;
    isliked?: boolean;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined ) {
        switch (propName) {
            case Attribute.uid:
                this[propName] = newValue ? Number(newValue) : undefined;
                break;
                break;

            default:
                this[propName] = newValue;
                break;
        }
    }
    connectedCallback() {   
        this.postData = appState.normalPosts.find((post: any)  => post.uid === this.uid);
        console.log(this.postData.likes);
        
        this.isliked = this.postData.likes.find((user: any) => user === appState.user) ? true : false;
        console.log("IS LIKED?", this.isliked);        

        // console.log(this.postData.likes.find((user: any) => {user === String(appState.user);}));
        
        this.render();
    }
    async toggleLike() {
        console.log("IS LIKED?", this.isliked);
        if(this.isliked) this.postData.likes = this.postData.likes.filter((user: any) => user !== appState.user);
        else this.postData.likes.push(appState.user);
        
        console.log("LIKES IN POST", this.postData.likes);
        await interactPost(this.postData.firebaseID!, "likes", this.postData.likes);
        this.isliked = !this.isliked;
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/src/components/normal-post/normal-post.css">
            <section class="post-card">
                <div class="user">
                    <div class="circle">
                        <img src="${this.profileimg}" alt="profileimg">
                        </div>
                    <h3>${this.username || "No user"}</h3>
                </div>
                <p>${this.posttext || " No post Text"}</p>
                <img class="postimg" src="${this.postimg}" alt="">
                <button id="like-button">
                <img src="${this.isliked ? 'https://img.icons8.com/?size=100&id=85339&format=png&color=E8EDFF87' : 'https://img.icons8.com/?size=100&id=85038&format=png&color=E8EDFF87'}" alt="hearticon">
                        ${this.postData.likes.length}
                </button>
            </section>
            `;

            const likeButton = this.shadowRoot.getElementById('like-button');
            likeButton?.addEventListener('click', () => this.toggleLike());

            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);

        }
    }
}

customElements.define("normal-post", Post);
export default Post;
