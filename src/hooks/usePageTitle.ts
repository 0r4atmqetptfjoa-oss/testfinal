// A small custom hook to update the document title when pages mount.
// Passing a page title will set `document.title` to "<title> - Mentor ANA".
// This improves usability and accessibility by providing context in the browser tab.
import { useEffect } from 'react';

export default function usePageTitle(title: string) {
  useEffect(() => {
    // Prefix all page titles with the app name
    document.title = `${title} - Mentor ANA`;
  }, [title]);
}