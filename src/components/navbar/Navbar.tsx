interface NavBarProps {
  navItems: string[];
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const NavBar = ({navItems, activeSection, setActiveSection}: NavBarProps) => {

  const handleSetActiveSection = (selectedNavItem: string) => {
    setActiveSection(selectedNavItem);
  }

  return (
    <nav>
      <div>

      {navItems.map((navItem, i) => 
        (<button 
          className={activeSection === navItem ? 'active-nav-button' : ''} 
          onClick={() => {handleSetActiveSection(navItem)}}
          key={i}
          >
            {navItem}
        </button>)
      )}
      </div>
    </nav>
  );
}