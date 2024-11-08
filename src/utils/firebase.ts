import { collection } from "firebase/firestore";
import { firebaseConfig } from "../../fbcg"
import { appState } from '../store';
import { Attribute } from "../components/eventPageDetails/eventPageDetails";

let db: any;
let auth: any;
let storage: any;

export const getFirebaseInstance = async () => {
    if(!db){
        const { getFirestore } = await import("firebase/firestore");
        const { initializeApp } = await import('firebase/app');
		const { getAuth } = await import('firebase/auth');
		const { getStorage } = await import('firebase/storage');

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
		storage = getStorage();
    }

    return { db, auth, storage };
}

export const addPost = async (post: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'posts');
		
		const registerPost = {
			...post,
			userUID: appState.user,
		}

		await addDoc(where, registerPost);
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getPosts = async () => {
    try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'posts');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc: any) => {
			data.push({...doc.data(), firebaseID: doc.id});
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			username: credentials.username,
			profileImg: credentials.profileImg,
		};

		await setDoc(where, data);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const { auth } = await getFirebaseInstance();
		const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');

		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				return signInWithEmailAndPassword(auth, email, password);
			})
			.catch((error: any) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	} catch (error) {
		console.error(error);
	}
};

export const signOut = async () => {
	const { auth } = await getFirebaseInstance();
	const { signOut } = await import('firebase/auth');

	signOut(auth).then(() => {
		appState.user = '';
		console.log('Sign Out');
	}).catch((error: any) => {
		console.error(error);
	});
};

export const getUser = async (uid: string) => {
	const { db, auth } = await getFirebaseInstance();
	const {  doc, getDoc } = await import('firebase/firestore');
	
	const ref = doc(db, 'users', uid);
	const querySnapshot = await getDoc(ref);

	return querySnapshot.data();
};

export const getPostsByUser = async (uid: string) => {
	const posts = await getPosts();

	const filtered = posts?.filter((post: any) => post.userUID === uid);

	return filtered;
};

export const interactPost = async (uid: string, attribute: string, value: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { updateDoc, doc } = await import('firebase/firestore');

		const where = doc(db, 'posts', uid);

		await updateDoc(where, {
			[attribute]: value,
		});
		
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

// export const getPostById = async (uid: string) => {
// 	const { db, auth } = await getFirebaseInstance();
// 	const {  doc, getDoc } = await import('firebase/firestore');
	
// 	const ref = doc(db, 'posts', uid);
// 	const querySnapshot = await getDoc(ref);

// 	const data = querySnapshot.data();

// 	return data;
// };

export const uploadFile = async (file: File, dir: string, id: string) => {
	const { storage } = await getFirebaseInstance();
	const { ref, uploadBytes } = await import('firebase/storage');

	const storageRef = ref(storage, `${dir}/${id}`);
	await uploadBytes(storageRef, file).then((snapshot) => {
		console.log('File uploaded');
	});
};

export const getFile = async (id: string, dir: string) => {
	const { storage } = await getFirebaseInstance();
	const { ref, getDownloadURL } = await import('firebase/storage');

	const storageRef = ref(storage, `${dir}/${id}`);
	const urlImg = await getDownloadURL(ref(storageRef))
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.error(error);
		});

	return urlImg;
};
