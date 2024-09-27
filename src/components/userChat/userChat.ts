import styles from './userChat.css';
export enum Attribute{
    'profileimg' = 'profileimg',
    'username' = 'username',
    'iconmessage' = 'iconmessage',
}
class userChat extends HTMLElement {

    profileimg?: string;
    username?: string;
    iconmessage?: string;
    

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(){
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined ) {
        switch(propName){
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
            
            <section class="user-chat">
                <div class="user-nameandimg">
                    <img src="${this.profileimg}" alt="profileimg">
                    <h3>${this.username}</h3>
                </div>
                <img src="${this.iconmessage}" alt="iconmessage">

            </section>
            `;
            
        }
        const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
    }
    
}

customElements.define('user-chat', userChat);
export default userChat;