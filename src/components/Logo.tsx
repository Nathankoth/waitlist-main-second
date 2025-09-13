
import React from 'react';
import logoImage from '@/assets/vistaforge-logo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage} 
        alt="VistaForge" 
        className="h-10 w-10 object-contain"
      />
      <span className="text-xl font-semibold text-foreground tracking-tight">
        VistaForge
      </span>
    </div>
  );
};

export default Logo;
