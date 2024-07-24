import { useState } from "react";
import { NavBar } from "./components/navbar/Navbar";
import { StudyInterface } from "./components/study/StudyInterface";
import { ManageInterface } from "./components/manage/ManageInterface";

function App() {

  const navItems = ['study', 'manage'];

  const [activeSection, setActiveSection] = useState('manage');
  const [selectedSet, setSelectedSet] = useState(0);

  return (
    <>
      <NavBar navItems={navItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'study' && <StudyInterface set={selectedSet}/> }
      {activeSection === 'manage' && <ManageInterface selectedSet={selectedSet} setSelectedSet={setSelectedSet} />}
    </>
  );
}

export default App;