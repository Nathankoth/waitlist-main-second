
import React from 'react';
import Logo from './Logo';
import '../cursor-footer-polish-20250101-064951.css';
import '../cursor-footer-layout-20250101-065744.css';
import '../cursor-footer-fullwidth-20250101-073000.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <div className="brand">
            <Logo />
            <p className="tagline">
              Instant Property Visualization
            </p>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="contact">
            <a href="mailto:info@vistaphone.com">
              info@vistaphone.com
            </a>
            <a href="tel:+2348100000000">
              +234 810 000 0000
            </a>
          </div>
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/vistaforge" target="_blank" rel="noopener noreferrer" aria-label="VistaForge on LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <path d="M2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://x.com/forge_vista?s=21" target="_blank" rel="noopener noreferrer" aria-label="VistaForge on X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.3964 11.224L20.2964 4H18.7964L12.7964 10.506L8.19641 4H3.79641L10.9964 13.224L10.9964 20H13.3964V11.224ZM11.7964 9.688L11.2464 9.168L5.04641 5.496H7.44641L12.6964 11.64L13.2464 12.16L18.7964 18.4H16.3964L11.7964 12.432V9.688Z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/vista.forge?igsh=eXB3dWdjdjV4NDdn&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="VistaForge on Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <path d="M17.5 6.5h.01"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@vistaforge" target="_blank" rel="noopener noreferrer" aria-label="VistaForge on YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2c.313-1.732.467-3.482.46-5.33a29.005 29.005 0 00-.46-5.33z"/>
                <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        © 2025 VistaPhone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
