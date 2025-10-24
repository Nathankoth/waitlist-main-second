import React from 'react';
import copy from '@/content/copy.json';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {copy.footer.copyright}
          </p>
          <p className="text-sm text-muted-foreground">
            {copy.footer.privacy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;