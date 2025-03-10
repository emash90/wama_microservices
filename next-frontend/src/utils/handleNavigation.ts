// utils/handleNavigation.ts
const handleNavigation = (navigate: (path: string) => void, route: string) => {
    console.log("Navigating to:", route);
    navigate(route);
  };
  
  export default handleNavigation;
  