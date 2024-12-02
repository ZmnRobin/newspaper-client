import React, { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageSrc, imageAlt }) => {
  return (
    <div className="flex mt-1 mb-4">
      <div className="hidden lg:flex lg:w-1/2  items-center justify-center">
        <Image src={imageSrc} alt={imageAlt} width={600} height={600} objectFit="cover" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;