'use client'
import { Loading } from '@/components/ui/loading';
import { useAppSelector } from '@/lib/redux/store';
import { selectedCurrentUser } from '@/lib/redux/user/user.slide';
import { HomeLayout } from '@/modules/home/ui/layouts/home-page';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
function layout({ children }: { children: React.ReactNode }) {
  const currentUser = useAppSelector(selectedCurrentUser)
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push('/sign-in');
    } else {
      setIsChecking(false);
    }
  }, [currentUser, router]);

  if (isChecking) {

    return (
      <Loading />
    )
  }

  return (
    <HomeLayout >
      {children}

    </HomeLayout>
  );
}

export default layout;