// app/components/ClientOnlyToast.tsx
'use client';

import { ToastContainer } from 'react-toastify';

export default function ClientOnlyToast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    );
}
