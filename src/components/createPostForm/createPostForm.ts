import Styles from './createPostForm.css';

import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { addPost, getFile, uploadFile } from '../../utils/firebase';

class CreatePostForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <form>
                    <h3>Caption</h3>
                    <textarea id="caption" name="caption" required placeholder="Type here what you want to say to the world..."></textarea>
                    <div>
                        <h3>Image</h3>
                        <label for="image">Want to post an image as well? Select the option below to add a new picture.</label>
                        <input type="file" id="image" name="image"> <!-- CHANGE AS SOON AS STORAGE ISSUE IS RESOLVED -->
                    </div>
                    <button type="submit">Publish</button>
                </form>
            `;

            const form = this.shadowRoot.querySelector('form')!;
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const postId = new Date().getTime();
                const caption = form.caption.value;
                const image = form.image.files[0];
                let imageUrl;
                if(image) {
                    uploadFile(image, 'postImages', String(postId));
                    imageUrl = await getFile(String(postId), 'postImages');
                } else {
                    imageUrl = '';
                }
                

                const post = {
                    uid: postId,
                    isEvent: false,
                    profileImg: "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png", // CHANGE WITH USER INFO
                    username: "Default User", // CHANGE WITH USER INFO
                    postText: caption,
                    postImg: String(imageUrl),
                    likes: 0,
                }

                await addPost(post);
                dispatch(navigate(Screens.DASHBOARD));
            });

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot?.appendChild(css);
        }
    }
}

customElements.define('create-post-form', CreatePostForm);
export default CreatePostForm;