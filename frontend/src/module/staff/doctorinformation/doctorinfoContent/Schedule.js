import SchedulesContenForAll from "module/schedules/SchedulesContenForAll";
import React from "react";

function Assessment({ doct }) {
  return (
    <div className="w-[77%] ml-[170px] mt-[80px] bg-white  flex justify-center">
      <SchedulesContenForAll
        email={doct?.email}
        role={doct?.role}
      ></SchedulesContenForAll>
    </div>
  );
}
export default Assessment;
