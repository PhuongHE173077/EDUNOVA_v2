'use client';
import { USER_ROLE } from "@/lib/constants";
import { useAppSelector } from "@/lib/redux/store";
import { selectedCurrentUser } from "@/lib/redux/user/user.slide";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  const currentUser = useAppSelector(selectedCurrentUser);


  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === USER_ROLE.STUDENT) {
        router.push('/student');
      }

    } else {
      router.push('/sign-in');
    }

  }, [router])

  return null;
}
