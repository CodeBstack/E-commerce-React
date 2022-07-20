import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/fireebase/firebase.utils';

// It is a state management technique

// as the actual value you want to access, the default value is passed to it.
export const UserContext = createContext({
  currentUser: null,

  // empty func that returns null
  setCurrentUser: () => null,
});

// This provider will allow any of the children
// irrespective of the depth, to access the state VALUE.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
