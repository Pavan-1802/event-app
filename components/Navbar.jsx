"use client"
import Image from 'next/image'
import logo from "../public/images/logo.svg"
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    setUser(null);
  };
  return (
    <div className='bg-gray-300 flex justify-between p-5'>
    <Image src={logo} width={150} height={150}></Image>
    <button onClick={handleLogout} className="bg-primary text-white rounded-full px-3 py-2">
              Log Out
            </button>
    </div>
  )
}

export default Navbar
