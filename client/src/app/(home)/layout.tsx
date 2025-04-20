import { HomeLayout } from '@/modules/home/ui/layouts/home-page';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout >
      {children}
    </HomeLayout>
  );
}

export default layout;