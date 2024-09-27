import styles from './normal-post.css';
export enum Attribute{
    'profileimg' = 'profileimg',
    'username' = 'username',
    'posttext' = 'posttext',
    'postimg' = 'postimg',
    'likes' = 'likes',
}

class Post extends HTMLElement{
    profileimg?: string;
    username?: string;
    posttext?: string;
    postimg?: string;
    likes: number = 0;
    isLiked: boolean = false;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return Object.values(Attribute);
    }
    
    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined ) {
        switch (propName) {
            case Attribute.likes:
                this.likes = newValue ? Number(newValue) : 0;
                break;

            default:
                this[propName] = newValue;
                break;
      }  
    }
    connectedCallback(){
        this.render();
    
    }
    toggleLike() {
        this.isLiked = !this.isLiked;
        this.likes += this.isLiked ? 1 : -1;
    }
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            
            <section class="post-card">
                <div class="user">
                    <div class="circle">
                        <img src="${this.profileimg}" alt="profileimg">
                        </div>
                    <h3>${this.username || 'No user'}</h3>
                </div>
                <p>${this.posttext || ' No post Text'}</p>
                <img class="postimg" src="${this.postimg}" alt="">
                <button id="like-button">
                   <img src="${this.isLiked ? 'https://img.icons8.com/?size=100&id=85339&format=png&color=E8EDFF87' : 'https://img.icons8.com/?size=100&id=85038&format=png&color=E8EDFF87'}" alt="hearticon">
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

customElements.define('normal-post', Post);
export default Post;