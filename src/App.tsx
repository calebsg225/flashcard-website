import { useState } from "react";
import { NavBar } from "./components/navbar/Navbar";
import { StudyInterface } from "./components/study/StudyInterface";
import { ManageInterface } from "./components/manage/ManageInterface";

function App() {

  const navItems = ['Study', 'Manage'];

  const [activeSection, setActiveSection] = useState(navItems[0]);
  const [selectedSet, setSelectedSet] = useState(0);

  return (
    <>
      <NavBar navItems={navItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'Study' && <StudyInterface set={selectedSet}/> }
      {
        activeSection === 'Manage' 
        && 
        <ManageInterface 
          selectedSet={selectedSet} 
          setSelectedSet={setSelectedSet} 
          setActiveSection={setActiveSection}
        />
      }
    </>
  );
}

export default App;