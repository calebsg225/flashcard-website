import { useState } from "react";
import { NavBar } from "./components/navbar/Navbar";
import { StudyInterface } from "./components/study/StudyInterface";
import { ManageInterface } from "./components/manage/ManageInterface";
import { SelectedSet } from "./types/setDataTypes";

function App() {

  const navItems = ['Study', 'Manage'];

  const [activeSection, setActiveSection] = useState(navItems[0]);
  const [selectedSet, setSelectedSet] = useState<SelectedSet>('sample'); // study interface by default displays sample set

  return (
    <>
      <NavBar navItems={navItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'Study' && <StudyInterface /> }
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