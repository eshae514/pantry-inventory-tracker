'use client'

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import ClientApp component
const ClientApp = dynamic(() => import('./Client'), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientApp />
    </Suspense>
  );
}
