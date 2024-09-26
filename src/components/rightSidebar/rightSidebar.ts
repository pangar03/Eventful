import styles from './rightSidebar.css';
export enum Attribute{
    'eventful' = 'eventful',
    'profileimg' = 'profileimg',
    'username' = 'username',
    'numpost' = 'numpost',
    'friends' = 'friends',
}
class sideBar extends HTMLElement {

    eventful?: string;
    profileimg?: string;
    username?: string;
    numpost?: number;
    friends?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(){
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined ) {
        switch(propName){
          case Attribute.numpost:
              this.numpost = newValue ? Number(newValue) : undefined;
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
            <section class="container-right">
                <h1 class="eventful">${this.eventful}</h1>
                <div class="container-user">
                    <div class="circle">
                        <img src="${this.profileimg}" alt="profileimg">
                        </div>
                    <h3>${this.username}</h3>
                    <div class="numpost">
                        <p>${this.numpost}</p>
                        <p>Posts</p>
                    </div>
                    <div class="friends">
                        <p>${this.friends}</p>
                        <p>Friends</p>
                    </div>
                    <button class="new-post-button">+ New Post</button>
                </div>
            </section>
        `;
            
        }
        const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
    }
    
}

customElements.define('side-bar', sideBar);
export default sideBar;
