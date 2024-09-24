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
    
    attributeChangedCallback(likes: Attribute, oldValue: string | undefined, newValue: string | undefined ) {
      switch(likes){
        case Attribute.likes:
            this.likes = newValue ? Number(newValue) : undefined;
            break;
      }  
    }
    connectedCallback(){
        this.render();
    }
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./src/components/normal-post/normal-post.css">
            <section>
                <div class="user">
                    <img src="${this.profileimg}" alt="profileimg">
                    <h3>${this.username || 'No user'}</h3>
                </div>
                <p>${this.posttext}</p>
                <img src="${this.postimg}" alt="postimg">
                <div class="like">
                    <img src="https://firebasestorage.googleapis.com/v0/b/juli-3cbcd.appspot.com/o/heart-icon.png?alt=media&token=aa398358-ec43-4404-a873-370f8066194b" alt="hearticon">
                    <button>${this.likes}</button>
                </div>
            </section>
            `;
            
        }
    }
    
}

customElements.define('normal-post', Post);
export default Post;