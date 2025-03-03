
/**
 * OneMilk Micro Frontend Loader
 * Use this script to load the OneMilk micro frontend into a container application
 */

(function() {
  // Create global OneMilk namespace
  window.OneMilk = window.OneMilk || {};
  
  // Load function - creates container, loads script, and renders the app
  window.OneMilk.load = function(containerId, config = {}) {
    const { 
      basePath = '', 
      apiBasePath = '/api',
      cssPath = '/index.css',
      jsPath = '/main.js',
      containerClass = 'onemilk-container'
    } = config;
    
    // Set global flag to indicate we're in a micro frontend environment
    window.isInMicroFrontendContainer = true;
    
    // Create or find container element
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }
    
    container.className += ` ${containerClass}`;
    
    // Set API base URL if provided
    if (apiBasePath) {
      window.VITE_API_BASE_URL = apiBasePath;
    }
    
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${basePath}${cssPath}`;
    document.head.appendChild(link);
    
    // Load JS
    const script = document.createElement('script');
    script.src = `${basePath}${jsPath}`;
    script.onload = function() {
      // Render app when script is loaded
      if (window.renderOneMilk) {
        window.OneMilk.unmount = window.renderOneMilk(containerId, basePath);
      }
    };
    document.body.appendChild(script);
    
    // Return unmount function
    return function() {
      if (window.OneMilk.unmount) {
        window.OneMilk.unmount();
      }
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  };
})();
