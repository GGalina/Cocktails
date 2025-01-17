import * as icons from '../images/svg/user.svg';
import { refs } from '../js/global/refs';
const { authorization, linkToSignOut } = refs;
import { initializeApp } from 'firebase/app';

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  onValue,
} from 'firebase/database';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBSk3k-SUg9Wco3mDqClVSP1cXvTSW8MOs',
  authDomain: 'goit-js.firebaseapp.com',
  projectId: 'goit-js',
  storageBucket: 'goit-js.appspot.com',
  messagingSenderId: '393564713998',
  appId: '1:393564713998:web:635571a7cde75de092385f',
  databaseURL: 'https://goit-js-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };

onAuthStateChanged(auth, user => {
  if (user) {
    authorization.style.backgroundImage = `url("${user.photoURL}")`;
    linkToSignOut.classList.remove('invisible');
    linkToSignOut.classList.add('sign-out');
    linkToSignOut.addEventListener('click', () => {
      auth.signOut();
      linkToSignOut.classList.add('invisible');
      linkToSignOut.classList.remove('sign-out');
      authorization.style.backgroundImage = `url("${icons}")`;
      window.location.reload();
    });
  } else {
    linkToSignOut.removeEventListener('click', () => {
      auth.signOut();
      linkToSignOut.classList.add('invisible');
      linkToSignOut.classList.remove('sign-out');
      authorization.style.backgroundImage = `url("${icons}")`;
    });
  }
});

export function authorize() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
       window.location.reload();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export function writeFavoriteDrinks(userId, favoriteDrinks) {
  const db = getDatabase();
  favoriteDrinks.forEach(drink => {
    set(ref(db, `users/${userId}/favoriteDrinks/${drink.id}`), {
      id: drink.id,
      img: drink.img,
      name: drink.name,
    }).catch(error => alert('unsuccessful, error' + error));
  });
}

export function readFavoriteDrinks(userId) {
  const favDrinksArr = [];
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/favoriteDrinks`))
      .then(snapshot => {
        if (snapshot.exists()) {
          for (const key in snapshot.val()) {
            favDrinksArr.push(snapshot.val()[key]);
          }
          return favDrinksArr;
        }
      })
      .catch(error => {
        alert(error);
      });
    resolve(favDrinksArr);
  });
}

export function updateFavoriteDrinks(userId) {
  const db = getDatabase();
  const localStorageDrinks =
    JSON.parse(localStorage.getItem('favorite-cocktail')) ?? [];
  update(ref(db, `users/${userId}/favoriteDrinks`), { localStorageDrinks })
    .then(() => alert('data updated successfully'))
    .catch(error => alert('unsuccessful, error' + error));
}

export function deleteFavoriteDrink(userId, drinkId) {
  const db = getDatabase();
  remove(ref(db, `users/${userId}/favoriteDrinks/${drinkId}`));
  // .then(() => alert('data removed successfully'))
  // .catch((error) => alert('unsuccessful, error' + error));
}
