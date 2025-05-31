'use client'
import ChatDialog from '@/components/Chat/ChatDialog';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { useAppSelector } from '@/lib/redux/store';
import { selectedCurrentUser } from '@/lib/redux/user/user.slide';
import { HomeLayout } from '@/modules/home/ui/layouts/home-page';
import { MessageCircleMoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
function layout({ children }: { children: React.ReactNode }) {
  const currentUser = useAppSelector(selectedCurrentUser)
  const router = useRouter()
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (currentUser === null) {
        router.push('/sign-in');
      }
    }
  }, [currentUser, router, mounted]);

  if (!mounted || currentUser === undefined) {
    return <Loading />;
  }

  return (
    <div className='relative'>
      <HomeLayout >
        {children}

      </HomeLayout>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white border h-15 border-gray-200 shadow-lg rounded-full p-3 hover:bg-gray-100"
        variant="ghost"
      >
        <MessageCircleMoreIcon className="!w-7 !h-7 text-gray-700" strokeWidth={1.5} />
      </Button>
      <ChatDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default layout;