import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBoirtvoGDraVAgRxNyKU7NShwjtj2aLgM",
    authDomain: "tingle-629ab.firebaseapp.com",
    projectId: "tingle-629ab",
    storageBucket: "tingle-629ab.appspot.com",
    messagingSenderId: "523857607084",
    appId: "1:523857607084:web:7ef71ec43a452a9eee2209"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

const getUserList = async () => {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  var list = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });

  return list;
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getUserList,
};