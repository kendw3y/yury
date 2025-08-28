import React, { useEffect, useState } from 'react';

import UserProductsPage from './UserProds';
import AdminProductsPage from '../../admin/pages/AdminProds';

const ProductsPage: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem('user');
      setUserType(user);
    }
  }, []);

  if (userType === null) return <UserProductsPage />; // Loading...

  return userType === 'A' ? <AdminProductsPage /> : <UserProductsPage />;
};

export default ProductsPage;
