import MedicalHistoryContentForAll from "module/doctor/MedicalHistoryContent/MedicalHistoryContentForAll";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

function MedicalHistory({ doct }) {
  return (
    <div style={{ padding: "3% 12%" }} className="bg-white">
      <MedicalHistoryContentForAll
        email={doct?.email}
        role={doct?.role}
      ></MedicalHistoryContentForAll>
    </div>
  );
}
export default MedicalHistory;
