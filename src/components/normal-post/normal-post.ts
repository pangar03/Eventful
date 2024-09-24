export enum Attribute{
    'profileimg' = 'profileimg',
    'username' = 'username',
    'posttext' = 'posttext',
    'postimg' = 'postimg',
    'hearticon' = 'hearticon',
    'likes' = 'likes',
}

class Post extends HTMLElement{
    profileimg?: string;
    username?: string;
    posttext?: string;
    postimg?: string;
    hearticon?: string;
    likes?: number;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return Object.keys(Attribute);
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
                    <h3>${this.username}</h3>
                </div>
                <p>${this.posttext}</p>
                <img src="${this.postimg}" alt="postimg">
                <div class="icons">
                    <img src="${this.hearticon}" alt="hearticon">
                    <p>${this.likes}</p>
                </div>
            </section>
            `
        }
    }
    
}

customElements.define('normal-post', Post);
export default Post;