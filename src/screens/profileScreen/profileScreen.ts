import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar"
import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar"
import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";
import { addObserver, appState, dispatch } from "../../store";
import { getPostsAction } from "../../store/actions";
import { getPostsByUser, getUser } from "../../utils/firebase";
import Styles from './profileScreen.css';




class ProfileScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        addObserver(this);
    }
    async connectedCallback() {
        if(appState.normalPosts.length === 0 && appState.eventPosts.length === 0){
            const action = await getPostsAction();
            dispatch(action);
        } else {
            this.render();
        }
    }
    async render() {
        const currentUser = await getUser();
        const userPosts = await getPostsByUser(currentUser?.uid);
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div>
                    <side-bar profileimg="${currentUser?.profileImg}" username="${currentUser?.username}" numpost="${userPosts?.length}"></side-bar>
                    <section class="profile-container">
                         
                    </section>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;
        }
        const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot?.appendChild(css);
       
    }
};
customElements.define('profile-screen', ProfileScreen);
export default ProfileScreen;