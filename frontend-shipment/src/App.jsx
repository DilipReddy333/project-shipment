import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SidebarDropdown from "./components/SidebarDropdown";
import SidebarDropdownMenu from "./components/SidebarDropdownMenu";
import PendingJobs from "./components/PendingJobs";
import ReProcessJob from "./components/ReProcessJob";
import History from "./components/History";
import IntegrationReport from "./components/IntegrationReport";
import ExportInvoiceData from "./components/ExportInvoiceData";
import Configuration from "./components/Configuration";
import { useState } from "react";
import ShipmentMainContainer from "./components/ShipmentMainContainer";
import { FaFileAlt } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";

function App() {
  const [currentMenu, setCurrentMenu] = useState("Full Shipment");

  return (
    <>
      <div className="main_wrapper">
        <Sidebar>
          <Dashboard />
          <SidebarDropdown
            dropdownTitle={"Create Job"}
            titleIcon={<FaFileAlt className="common_icon_style" />}
          >
            <div className="create_job_options_container">
              <SidebarDropdownMenu
                className="job_and_left_arrow"
                dropdownMenu={"Full Shipment"}
                menuClickHandler={setCurrentMenu}
              />
              <SidebarDropdownMenu
                className="job_and_left_arrow"
                dropdownMenu={"Part Shipment"}
                menuClickHandler={setCurrentMenu}
              />
              <SidebarDropdownMenu
                className="job_and_left_arrow"
                dropdownMenu={"Amendment"}
                menuClickHandler={setCurrentMenu}
              />
            </div>
          </SidebarDropdown>
          <PendingJobs />
          <ReProcessJob />
          <History />
          <IntegrationReport />
          <ExportInvoiceData />
          <SidebarDropdown
            dropdownTitle={"Configuration"}
            titleIcon={<FaGears className="common_icon_style" />}
          >
            <div className="create_job_options_container">
              <SidebarDropdownMenu
                dropdownMenu={"Client Registration"}
                className="job_and_left_arrow"
                menuClickHandler={setCurrentMenu}
              />
              <SidebarDropdownMenu
                dropdownMenu={"Client List"}
                className="job_and_left_arrow"
                menuClickHandler={setCurrentMenu}
              />
            </div>
          </SidebarDropdown>
        </Sidebar>

        {/* Job Container */}
        <ShipmentMainContainer
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />
      </div>
    </>
  );
}

export default App;
