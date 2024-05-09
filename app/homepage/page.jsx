"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventDisplay from "@/components/EventDisplay";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState(null)
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if(!user) {
        router.push('/login')
      }
    }
    getUser();
    console.log(user?.email)
  }, [])
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <EventDisplay user={user}></EventDisplay>
      <Footer></Footer>
    </>
  );
}
