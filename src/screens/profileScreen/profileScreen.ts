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
                         <div class="profile-picture"></div>
                            <h2>${currentUser?.username}</h2>
                                <div class="profile-info">
                                    <label for="username">Username</label>
                                    <input type="text" placeholder="" id="username">
                                    <label for="username">Email</label>
                                    <input type="email" placeholder="" id="email">
                                    <label for="username">Current Password</label>
                                    <input type="password" placeholder="" id="current-password">
                                    <label for="username">New Password</label>
                                    <input type="password" placeholder="" id="new-password">
                                    <label for="username">Confirm New Password</label>
                                    <input type="password" placeholder="" id="new-password">
                                </div>
                            <button>Save Changes</button>

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