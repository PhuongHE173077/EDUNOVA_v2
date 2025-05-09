'use client'
import { Loading } from '@/components/ui/loading';
import { USER_ROLE } from '@/lib/constants';
import { useAppSelector } from '@/lib/redux/store';
import { selectedCurrentUser } from '@/lib/redux/user/user.slide';
import { HomeLayout } from '@/modules/lecturer/ui/layouts/home-page';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
function layout({ children }: { children: React.ReactNode }) {
    const currentUser = useAppSelector(selectedCurrentUser)
    const router = useRouter()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (currentUser === null) {
                router.push('/sign-in');
            }
            if (currentUser?.role !== USER_ROLE.LECTURER) {
                router.push('/');
            }
        }
    }, [currentUser, router, mounted]);

    if (!mounted || currentUser === undefined) {
        return <Loading />;
    }

    return (
        <HomeLayout >
            {children}

        </HomeLayout>
    );
}

export default layout;