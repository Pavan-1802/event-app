"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.svg"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
    
      // Insert email into student_test_data table
      const { data, error } = await supabase
        .from('student_test_data')
        .insert([{ email: email, name: userName}])
        .select();
    
      if (error) {
        console.error("Error inserting email:", error.message);
        // Handle error as needed
      }
    
      // Update user state, refresh router, and clear form inputs
      setUser(res.data.user);
      router.refresh();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNewUser(false); // Clear the confirm password input
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
    
  };
  
  const handleSignIn = async () => {
    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(res.data.user);
      setEmail("");
      setPassword("");
      router.push("/homepage");
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Display an error message to the user
      alert("Wrong credentials");
    }
  };
  
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-100 w-full h-screen">
        <div className="flex justify-center items-center space-x-1 text-3xl text-primary">
          <svg
            fill="none"
            className="w-10 h-10 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>

          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // if (user) {
  //   return (
  //     <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
  //       <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
  //         <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
  //           You're already logged in
  //         </h1>
  //         <button
  //           onClick={handleLogout}
  //           className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <main className="flex">
      <div className="h-screen bg-gray-100 w-1/2 flex items-center justify-center">
        <div className="flex items-center gap-4 w-max">
            <Image src={logo} height={400} width={400}></Image>
        </div>
      </div>
      <div className="h-screen w-1/2 flex flex-col items-center justify-center bg-primary px-6">
        <div className="mb-2">
          <h1 className="text-white text-5xl">Welcome</h1>        
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 w-full px-4 py-3 rounded-md border  bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          {newUser && (<input
              type="text"
              name="user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User name"
              className="mb-4 w-full px-4 py-3 rounded-md border  bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:border-gray-600"
            />)}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full px-4 py-3 rounded-md border  bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:border-gray-600"
            />
            
          {newUser && (<input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter Password"
            className="mb-4 w-full px-4 py-3 rounded-md border  bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />)}
          {!newUser && (<button
            onClick={handleSignIn}
            className="w-full px-4 py-3 rounded-md bg-[#FA776C] text-white hover:bg-purple-800 focus:outline-none"
          >
            Log In
          </button>)}
          {newUser && (<button
            onClick={handleSignUp}
            className="w-full px-4 py-3 rounded-md bg-green-400 text-white hover:bg-purple-600 focus:outline-none"
          >
            Sign Up
          </button>)}
          {!newUser && (
            <p className="text-black mt-5">
              New user?{" "}
              <button
                className="text-secondary"
                onClick={() => setNewUser(true)}
              >
                Sign Up
              </button>
            </p>
          )}
          {newUser && (
            <p className="text-white mt-5">
              Already have an account?{" "}
              <button
                className="text-green-300"
                onClick={() => setNewUser(false)}
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
