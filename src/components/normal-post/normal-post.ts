import styles from "./normal-post.css";
export enum Attribute {
    "uid" = "uid",
    "profileimg" = "profileimg",
    "username" = "username",
    "posttext" = "posttext",
    "postimg" = "postimg",
    "likes" = "likes",
    "isliked" = "isliked",
    "firebaseid" = "firebaseid",
}

class Post extends HTMLElement {
    uid?: string;
    firebaseid?: string;
    profileimg?: string;
    username?: string;
    posttext?: string;
    postimg?: string;
    likes: number = 0;
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
            case Attribute.likes:
                this[propName] = newValue ? Number(newValue) : 0;
                break;

            case Attribute.isliked:
                this[propName] = propName === 'isliked' ? newValue === 'true' : undefined;
                break;
                break;

            default:
                this[propName] = newValue;
                break;
        }
    }
    connectedCallback() {
        this.render();
    }
    toggleLike() {
        this.isliked = !this.isliked;
        this.likes += this.isliked ? 1 : -1;
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
                        ${this.likes}
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
