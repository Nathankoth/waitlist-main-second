
import React from 'react';
import logoImage from '@/assets/vistaforge-logo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <img 
        src={logoImage} 
        alt="VistaForge" 
        className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
      />
      <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
        <span className="hidden sm:inline">VistaForge</span>
        <span className="sm:hidden">Vista</span>
      </span>
    </div>
  );
};

export default Logo;
