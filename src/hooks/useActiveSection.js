import { useState, useEffect } from 'react';

/**
 * useActiveSection
 * Tracks which section ID is currently in the viewport.
 * Uses a more robust "center-point" detection logic.
 * @param {string[]} sectionIds - Array of section IDs to observe.
 */
const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Special case: Check if we are at the very bottom of the page
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      
      if (isAtBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Prefer the smallest matching section so nested anchors such as
      // #about and #domains take precedence over the #home page wrapper.
      // Check every matching element because some page sections share IDs.
      const trackedIds = new Set(sectionIds);
      const currentSection = [...document.querySelectorAll('[id]')]
        .filter((element) => trackedIds.has(element.id))
        .map((element) => ({
          id: element.id,
          bounds: element.getBoundingClientRect(),
        }))
        .filter(({ bounds }) => scrollPosition >= bounds.top + window.scrollY
          && scrollPosition <= bounds.bottom + window.scrollY)
        .sort((a, b) => a.bounds.height - b.bounds.height)[0]?.id || '';

      if (currentSection && currentSection !== activeId) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, activeId]);

  return activeId;
};

export default useActiveSection;
