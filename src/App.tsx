import { useState } from "react";
import { NavBar } from "./components/navbar/Navbar";
import { StudyInterface } from "./components/study/StudyInterface";
import { ManageInterface } from "./components/manage/ManageInterface";

function App() {
  const [activeSection, setActiveSection] = useState('study');
  const [selectedSet, setSelectedSet] = useState('sampleSet1');

  return (
    <>
      <NavBar />
      {activeSection === 'study' && <StudyInterface set={selectedSet}/> }
      {activeSection === 'manage' && <ManageInterface />}
    </>
  );
}

export default App;