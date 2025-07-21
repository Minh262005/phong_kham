import AdminContentCurveChart from "./Content/AdminContentCurveChart";
import AdminContentRow from "./Content/AdminContentRow";
import AdminContentSpecialty from "./Content/AdminContentSpecialty";
import AdminContentInfor from "./Content/AdminContentInfor";
import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import { downloadExcel } from "react-export-table-to-excel";
import axios from "axios";
import { publicPort } from "components/url/link";
import { useRef } from "react";
import Button from "components/button/Button";
import { CiSaveDown1, CiSaveDown2 } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { BiSave } from "react-icons/bi";


function AdminContent() {
  return (
    <div className="w-[100%]  h-[100%] flex">
      <div className="w-[50%]  h-[1000px]">
        <div className="w-[100%] h-[500px]  flex justify-start items-center">
          <div className="w-[100%] h-[450px] bg-white shadow-xl">
            <AdminContentCurveChart />
          </div>
        </div>
        <div className="w-[100%] h-[500px] ">
          <div className="w-[100%] h-[450px] bg-white shadow-xl">
            <AdminContentRow />
          </div>
        </div>
      </div>
      <div className="w-[50%] h-[1000px]">
        <div className="w-[100%] h-[500px]  flex justify-center items-center">
          <div className="w-[90%] h-[450px]  shadow-xl">
            <AdminContentSpecialty />
          </div>
        </div>
        <div className="w-[100%] h-[450px]  flex justify-center items-center">
          <div className="w-[90%] h-[450px] shadow-xl">
            <AdminContentInfor />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminContent;
