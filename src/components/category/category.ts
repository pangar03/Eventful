import styles from './normal-post.css';
export enum Attribute{
    'iconimg' = 'iconimg',
    'text' = 'text',
}
class categoryButton extends HTMLElement {

    iconimg?: string;
    text?: string;
    

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
            
            <section class="container-category">
                <img class="profileimg" src="${this.iconimg}" alt="">
                <h3>${this.text}</h3>
            </section>
            `;
            
        }
        const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
    }
    
}

customElements.define('category-button', categoryButton);
export default categoryButton;
