import { firebaseConfig } from "../../fbcg";
import { appState } from '../store';

let db: any;
let auth: any;

export const getFirebaseInstance = async () => {
    if(!db){
        const { getFirestore } = await import("firebase/firestore");
        const { initializeApp } = await import('firebase/app');
		const { getAuth } = await import('firebase/auth');

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    }

    return { db, auth };
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
			data.push(doc.data());
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
			// Add The Extra Data Here
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
}