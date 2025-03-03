
declare global {
  interface Window {
    renderOneMilk: (containerId: string, basePath?: string) => (() => void) | undefined;
    isInMicroFrontendContainer?: boolean;
  }
}

export {};
