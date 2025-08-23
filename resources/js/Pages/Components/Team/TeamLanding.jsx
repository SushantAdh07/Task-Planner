import React, {useState} from "react";
import TeamMain from "./Contents/TeamMain";
import Header from "./Components/TeamHeader";
import Sidebar from "./Components/TeamSidebar";
import Assignments from "./Contents/Assignments";

export default function Landing(){
    const [activeMenu, setActiveMenu] = useState(false);
    const renderContent = () =>{
        switch (activeMenu) {
            case 'Calendar': return <TeamMain />
            case 'Assignment': return <Assignments />
            default: return <TeamMain />
        }
    }

    return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}