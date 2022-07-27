"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onAuthStateChangedListener = exports.signOutUser = exports.signInAuthUserWithEmailAndPassword = exports.createAuthUserWithEmailAndPassword = exports.createUserDocumentFromAuth = exports.getCategoriesAndDocuments = exports.addCollectionAndDocuments = exports.database = exports.signInWithGoogleRedirect = exports.signInWithGooglePopup = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC9b67XDLETiuJDoohn8fXFuhj1im5FYRc',
  authDomain: 'crown-clothing-db-42da3.firebaseapp.com',
  projectId: 'crown-clothing-db-42da3',
  storageBucket: 'crown-clothing-db-42da3.appspot.com',
  messagingSenderId: '59887421770',
  appId: '1:59887421770:web:5abef3c635273305a419b3'
}; // Initialize Firebase

(0, _app.initializeApp)(firebaseConfig);
var googleProvider = new _auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
var auth = (0, _auth.getAuth)();
exports.auth = auth;

var signInWithGooglePopup = function signInWithGooglePopup() {
  return (0, _auth.signInWithPopup)(auth, googleProvider);
};

exports.signInWithGooglePopup = signInWithGooglePopup;

var signInWithGoogleRedirect = function signInWithGoogleRedirect() {
  return (0, _auth.signInWithRedirect)(auth, googleProvider);
};

exports.signInWithGoogleRedirect = signInWithGoogleRedirect;
var database = (0, _firestore.getFirestore)();
exports.database = database;

var addCollectionAndDocuments = function addCollectionAndDocuments(collectionKey, objectToAdd, field //title
) {
  var collectionRef, batch;
  return regeneratorRuntime.async(function addCollectionAndDocuments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          collectionRef = (0, _firestore.collection)(database, collectionKey); // for successful txn

          batch = (0, _firestore.writeBatch)(database);
          objectToAdd.forEach(function (object) {
            var docRef = (0, _firestore.doc)(collectionRef, object[field].toLowerCase());
            batch.set(docRef, object);
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(batch.commit());

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addCollectionAndDocuments = addCollectionAndDocuments;

var getCategoriesAndDocuments = function getCategoriesAndDocuments() {
  var collectionRef, q, querySnapshot, categoryMap;
  return regeneratorRuntime.async(function getCategoriesAndDocuments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          collectionRef = (0, _firestore.collection)(database, 'categories');
          q = (0, _firestore.query)(collectionRef);
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

        case 4:
          querySnapshot = _context2.sent;
          // console.log( querySnapshot);
          categoryMap = querySnapshot.docs.reduce(function (acc, docSnapshot) {
            var _docSnapshot$data = docSnapshot.data(),
                title = _docSnapshot$data.title,
                items = _docSnapshot$data.items;

            acc[title.toLowerCase()] = items;
            return acc;
          }, {});
          return _context2.abrupt("return", categoryMap);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Creating the user authentication


exports.getCategoriesAndDocuments = getCategoriesAndDocuments;

var createUserDocumentFromAuth = function createUserDocumentFromAuth(userAuth, additionalInfo) {
  var userDocRef, userSnapshot, displayName, email, createdAt;
  return regeneratorRuntime.async(function createUserDocumentFromAuth$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (userAuth) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return");

        case 2:
          userDocRef = (0, _firestore.doc)(database, 'users', userAuth.uid); //   console.log(userDocRef);

          _context3.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(userDocRef));

        case 5:
          userSnapshot = _context3.sent;

          if (userSnapshot.exists()) {
            _context3.next = 17;
            break;
          }

          displayName = userAuth.displayName, email = userAuth.email;
          createdAt = new Date();
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(userDocRef, _objectSpread({
            displayName: displayName,
            email: email,
            createdAt: createdAt
          }, additionalInfo)));

        case 12:
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](9);
          console.log('error creating the user', _context3.t0.message);

        case 17:
          return _context3.abrupt("return", userDocRef);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 14]]);
}; // auth for the email and password--create account


exports.createUserDocumentFromAuth = createUserDocumentFromAuth;

var createAuthUserWithEmailAndPassword = function createAuthUserWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function createAuthUserWithEmailAndPassword$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!email || !password)) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return");

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _auth.createUserWithEmailAndPassword)(auth, email, password));

        case 4:
          return _context4.abrupt("return", _context4.sent);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // sign in


exports.createAuthUserWithEmailAndPassword = createAuthUserWithEmailAndPassword;

var signInAuthUserWithEmailAndPassword = function signInAuthUserWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function signInAuthUserWithEmailAndPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(!email || !password)) {
            _context5.next = 2;
            break;
          }

          return _context5.abrupt("return");

        case 2:
          _context5.next = 4;
          return regeneratorRuntime.awrap((0, _auth.signInWithEmailAndPassword)(auth, email, password));

        case 4:
          return _context5.abrupt("return", _context5.sent);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // sign out


exports.signInAuthUserWithEmailAndPassword = signInAuthUserWithEmailAndPassword;

var signOutUser = function signOutUser() {
  return regeneratorRuntime.async(function signOutUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _auth.signOut)(auth));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // auth listener for sign in and sign out


exports.signOutUser = signOutUser;

var onAuthStateChangedListener = function onAuthStateChangedListener(callback) {
  return (0, _auth.onAuthStateChanged)(auth, callback);
};

exports.onAuthStateChangedListener = onAuthStateChangedListener;