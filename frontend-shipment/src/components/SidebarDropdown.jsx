import { useState } from "react";
import {
  LiaAngleDoubleDownSolid,
  LiaAngleDoubleRightSolid,
} from "react-icons/lia";

const SidebarDropdown = ({ dropdownTitle, titleIcon, children }) => {
  const [showJobs, setShowJobs] = useState(false);
  const showJobsHandler = () => {
    setShowJobs((prev) => !prev);
  };
  return (
    <>
      <div
        className={`common_sidebar_options_style create_job_style`}
        onClick={showJobsHandler}
      >
        {titleIcon}
        <div className="create_job_arrow_icons">
          <span>{dropdownTitle}</span>
          {showJobs ? (
            <LiaAngleDoubleDownSolid className="double_arrow_style" />
          ) : (
            <LiaAngleDoubleRightSolid className="double_arrow_style" />
          )}
        </div>
      </div>
      {showJobs ? children : null}
    </>
  );
};

export default SidebarDropdown;
