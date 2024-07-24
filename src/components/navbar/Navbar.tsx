interface NavBarProps {
  navItems: string[];
  activeSection: string;
  setActiveSection: Function;
}

export const NavBar = ({navItems, activeSection, setActiveSection}: NavBarProps) => {

  const handleSetActiveSection = (selectedNavItem: string) => {
    setActiveSection(selectedNavItem);
  }

  return (
    <nav>
      {navItems.map((navItem) => 
        (<button 
          className={activeSection === navItem ? 'active-nav-button' : ''} 
          onClick={() => {handleSetActiveSection(navItem)}}>{navItem}
        </button>)
      )}
    </nav>
  );
}