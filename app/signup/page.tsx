'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');

  //   const user = auth.currentUser;
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [secretKeyError, setSecretKeyError] = useState('');
  const [registerError, setRegisterError] = useState(null);

  const registerUser: (e: any) => void = async (e) => {
    e.preventDefault();
    // Reset previous error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSecretKeyError('');
    setRegisterError(null);
    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
      return;
    }
    setPasswordError('');

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
    setConfirmPasswordError('');

    // Secret key validation
    const secretKeyFromCompanyHead = 'asdf@951';
    if (secretKey !== secretKeyFromCompanyHead) {
      setSecretKeyError('Invalid secret key');
      return;
    }
    setSecretKeyError('');

    // If all validations pass, perform the user registration logic here
    try {
      // const userCredential = await createUserWithEmailAndPassword(
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (err:any) {
      const errorCode = err?.code;
      setRegisterError(errorCode.replace('auth/', ' '));
      const errorMessage = err?.message;
      console.log('Error registering user', errorCode, errorMessage);
    }
  };

  return (
    <div className="flex items-center lg:items-start lg:justify-start mb-3">
      <div className=" -z-[100]    feedback-gradient" />
      <form className="relative flex flex-col items-center justify-center lg:items-start lg:justify-start grow">
        <div className="w-full md:p-6 px-2  rounded-md md:shadow-md md:max-w-xl md:border-t">
          <h1
            className={`${caveat.className} text-5xl font-bold text-center  text-gradient-black dark:text-gradient-reverse`}
          >
            Register
          </h1>
          <div className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm  font-light">
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2  bg-transparent border dark:border-gray-500 focus:border-gray-100 rounded-md   focus:outline-none"
                value={email}
                placeholder="Email here"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-xs text-rose-500 mt-1">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm  font-light">
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2  bg-transparent border dark:border-gray-500 focus:border-gray-100 rounded-md   focus:outline-none"
                value={password}
                placeholder="Password here"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-xs text-rose-500 mt-1">{passwordError}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm  font-light">
                Confirm Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2  bg-transparent border dark:border-gray-500 focus:border-gray-100 rounded-md   focus:outline-none"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <p className="text-xs text-rose-500 mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm  font-light">
                Secret Key
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2  bg-transparent border dark:border-gray-500 focus:border-gray-100 rounded-md   focus:outline-none"
                value={secretKey}
                placeholder="Enter secret key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
              {secretKeyError && (
                <p className="text-xs text-rose-500 mt-1">{secretKeyError}</p>
              )}
            </div>
            {registerError && (
              <p className="text-xs text-rose-500 mt-1">{registerError}</p>
            )}

            <div className="mt-2">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                disabled={!email || !password || !confirmPassword || !secretKey}
                onClick={(e) => registerUser(e)}
              >
                Signup
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-center global-text-color">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
