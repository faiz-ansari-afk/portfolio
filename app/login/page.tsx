"use client"
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
});

const Login = () => {
    const router = useRouter()
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(null);
  const handleLogin: (e: any) => void = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const userLogged = userCredential.user;
      router.replace('/')
    } catch (error:any) {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log('error login user', errorCode, errorMessage);
      setLoginError(errorCode.replace('auth/', ' '));
    }
  };

  return (
    <div className="flex h-full  items-center  justify-center lg:items-start lg:justify-start  mb-3">
        <div className=" -z-[100]    feedback-gradient" />
      <div className="relative flex flex-col items-center  justify-center lg:items-start lg:justify-start  grow">
        <div className="w-full md:p-6 px-2   rounded-md md:shadow-md md:max-w-xl md:border-t">
          <h1 className={`${caveat.className} text-5xl font-bold text-center  text-gradient-black dark:text-gradient-reverse`}>
            Login
          </h1>
          <form className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm  font-light"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2  bg-transparent border dark:border-gray-500 focus:border-gray-100 rounded-md   focus:outline-none "
                value={email}
                placeholder="Email here..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm  font-light"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 bg-transparent  border dark:border-gray-500 focus:border-gray-100 rounded-md   focus:outline-none "
                value={password}
                placeholder="Password here..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && (
              <p className="text-xs text-rose-500">{loginError}</p>
            )}
            <div className="mt-2">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={(e) => handleLogin(e)}
                disabled={!email || !password}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center global-text-color">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
