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
    likes?: number;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return Object.values(Attribute);
    }
    
    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined ) {
      switch(propName){
        case Attribute.likes:
            this.likes = newValue ? Number(newValue) : undefined;
            break;

            default:
                this[propName] = newValue;
                break;
      }  
    }
    connectedCallback(){
        this.render();
        
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
                    <img src="https://firebasestorage.googleapis.com/v0/b/juli-3cbcd.appspot.com/o/heart-icon.png?alt=media&token=aa398358-ec43-4404-a873-370f8066194b" alt="hearticon">
                    <p>${this.likes}</p>
                </button>
            </section>
            `;
            
        }
        const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
    }
    
}

customElements.define('normal-post', Post);
export default Post;