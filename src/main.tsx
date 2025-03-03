
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// For micro frontend architecture, define mount function
window.renderOneMilk = (containerId: string, basePath: string = '') => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const root = createRoot(container);
  root.render(<App basePath={basePath} />);
  
  return () => {
    root.unmount();
  };
};

// Support standalone mode
if (!window.isInMicroFrontendContainer) {
  createRoot(document.getElementById("root")!).render(<App basePath="" />);
}

// Add type definitions to window object
declare global {
  interface Window {
    renderOneMilk: (containerId: string, basePath?: string) => (() => void) | undefined;
    isInMicroFrontendContainer?: boolean;
  }
}
