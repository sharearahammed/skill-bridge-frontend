'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, UserRole } from '../lib/auth';

interface PrivateRouteProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user || !roles.includes(user.role)) {
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    });
  }, [router, roles]);

  if (!authorized) return <div>Loading...</div>;
  return <>{children}</>;
}