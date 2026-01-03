// Simplified toast hook to replace Shadcn toast
// This prevents errors in components that use the toast hook
export const useToast = () => {
  const toast = ({ title, description, variant }) => {
    console.log(`Toast: [${variant || 'default'}] ${title} - ${description}`);
    // Optional: You could implement a simple custom toast here
    // or use window.alert(title);
  };

  return { toast };
};

export const toast = ({ title, description }) => {
    console.log(`Toast Global: ${title} - ${description}`);
};
