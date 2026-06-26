const fs = require('fs');

// --- 1. Fix layout.tsx ---
let layout = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');

// Replace handleScroll block completely
layout = layout.replace(
  /const handleScroll = \(e: Event\) => \{[\s\S]*?window\.addEventListener\('scroll', handleScroll, \{ passive: true, capture: true \}\);[\s\S]*?return \(\) => window\.removeEventListener\('scroll', handleScroll\);\s*\}, \[\]\);/,
  `const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Ignore iOS rubber-band bounce
        if (currentScrollY < 0) return;
        
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          if (isNavVisible.current) {
            setShowNav(false);
            isNavVisible.current = false;
          }
        } else if (currentScrollY < lastScrollY.current) {
          if (!isNavVisible.current) {
            setShowNav(true);
            isNavVisible.current = true;
          }
        }
        
        lastScrollY.current = currentScrollY;
      }
    };

    const handleHideNav = () => {
      if (isNavVisible.current) {
        setShowNav(false);
        isNavVisible.current = false;
      }
    };
    
    const handleShowNav = () => {
      if (!isNavVisible.current) {
        setShowNav(true);
        isNavVisible.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hide-nav', handleHideNav);
    window.addEventListener('show-nav', handleShowNav);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hide-nav', handleHideNav);
      window.removeEventListener('show-nav', handleShowNav);
    };
  }, []);`
);

fs.writeFileSync('src/app/(app)/layout.tsx', layout);

// --- 2. Fix stands/[id]/page.tsx ---
let stands = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

// Add useRef to imports
stands = stands.replace(
  'import { useState, useEffect } from "react";',
  'import { useState, useEffect, useRef } from "react";'
);

// Add state refs inside StandRoomLayout
stands = stands.replace(
  'const [isMicPending, setIsMicPending] = useState(false);',
  `const [isMicPending, setIsMicPending] = useState(false);
  
  const lastChatScrollY = useRef(0);
  const handleChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastChatScrollY.current && currentScrollY > 20) {
      window.dispatchEvent(new CustomEvent('hide-nav'));
    } else if (currentScrollY < lastChatScrollY.current) {
      window.dispatchEvent(new CustomEvent('show-nav'));
    }
    lastChatScrollY.current = currentScrollY;
  };
`
);

// Multiply the dummy chat messages
stands = stands.replace(
  /const \[chatMessages, setChatMessages\] = useState\(\[\s*\{\s*id: 1,[\s\S]*?isSpeaker: false\s*\}\s*\]\);/,
  `const [chatMessages, setChatMessages] = useState([
    ...Array(15).fill(0).flatMap((_, i) => [
      {
        id: i * 2 + 1,
        name: "Gooner4Life",
        color: "text-[teal]",
        avatar: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        time: "1m ago",
        text: "Absolute shocker from the VAR there. Clear penalty! We are being robbed in broad daylight.",
        isSpeaker: false
      },
      {
        id: i * 2 + 2,
        name: "BlueMason",
        color: "text-[coral]",
        avatar: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        time: "Just now",
        text: "Never a pen. He dove before the contact even happened. 🤡 Have some shame!",
        isSpeaker: false
      }
    ])
  ]);`
);

// Add onScroll to the Chat Feed div
stands = stands.replace(
  '<div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6 relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]">',
  '<div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6 relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]" onScroll={handleChatScroll}>'
);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', stands);
