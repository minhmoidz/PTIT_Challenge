import { createContext, useContext } from 'react';

interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

export const AdminContext = createContext<{ user: AdminUser | null }>({ user: null });
export const useAdminUser = () => useContext(AdminContext);