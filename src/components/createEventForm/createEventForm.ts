import { dispatch } from '../../store';
import { getPostsAction, navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { addPost, getFile, uploadFile } from '../../utils/firebase';
import Styles from './createEventForm.css';

class CreateEventForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <form class="create-event-form">
                    <section>
                        <div id="event-title-div">
                        <label for="event-title">Event Title</label>
                        <input type="text" id="event-title" name="event-title" required placeholder="What is the name of the event?">
                    </div>
                    <div id="event-image-div">
                        <h3>Image</h3>
                        <p>Upload an image for your new event!</p>
                        <label for="image" id="textlabel">Upload File</label>
                        <input type="file" id="image" name="image"><!-- CHANGE AS SOON AS STORAGE ISSUE IS RESOLVED -->
                    </div>
                    <div id="description-div">
                        <label for="description">Description</label>
                        <input type="text" id="description" name="description" required placeholder="Type here what is the event about...">
                    </div>
                    <div id="location-div">
                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" required placeholder="Where will the event take place?">
                    </div>
                    <div class="date-time">
                        <div class="date">
                            <label for="date">Date</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="time">
                            <label for="time">Time</label>
                            <input type="time" id="time" name="time" required>
                        </div>
                    </div>
                    <div id="participants-div">
                        <label for="participants">Max. Participants</label>
                        <input type="number" id="participants" name="participants" required placeholder="How many people can join?" min="2">
                    </div>
                    </section>
                    
                    <button type="submit">Publish</button>
                </form>
            `;

            const form = this.shadowRoot.querySelector('form')!;
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const postId = new Date().getTime();
                const title = form['event-title'].value;
                const image = form.image.files[0];
                
                let urlImg;
                if (image) {
                    await uploadFile(image, 'eventImages', String(postId));
                    urlImg = await getFile(String(postId), 'eventImages');
                }
                
                const description = form.description.value;
                const location = form.location.value;
                const date = form.date.value;
                const time = form.time.value;
                const participants = form.participants.value;

                const post = {
                    uid: postId,
                    isEvent: true,
                    eventTitle: title,
                    eventLocation: location,
                    eventDate: `${date} ${time}`,
                    description,
                    eventImg: String(urlImg),
                    attendants: [],
                    maxAttendants: participants,                    
                }

                await addPost(post);
                const action = await getPostsAction();
                dispatch(action);
                dispatch(navigate(Screens.DASHBOARD));
            });

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
}

customElements.define('create-event-form', CreateEventForm);
export default CreateEventForm;