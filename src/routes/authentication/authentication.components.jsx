// import { useEffect } from 'react';   //FOR REDIRECT SIGN IN
// import { getRedirectResult } from 'firebase/auth';   //FOR REDIRECT SIGN IN
import SignUpForm from '../../component/sign-up-form/sign-up-form.component';
import SignInForm from '../../component/sign-in-form/sign-in-form.component';

import './authentication.styles.scss'
// import {
//   // auth,
//   signInWithGooglePopup,
//   createUserDocumentFromAuth,
//   //   signInWithGoogleRedirect,
// } from '../../utils/fireebase/firebase.utils';

const Authentication = () => {
  // FOR REDIRECT SIGN IN
  //   useEffect(async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //   }, []);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await getRedirectResult(auth);
  //       //   console.log(response);
  //       if (response) {
  //         createUserDocumentFromAuth(response.user);
  //       }
  //     }
  //     fetchData();
  //   }, []);

  return (
    <div className='authentication-container'>
      <SignInForm/>
      {/* <button onClick={logGoogleUser}>Sign in with google</button> */}

      {/* REDIRECT BUTTON */}
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default Authentication;
