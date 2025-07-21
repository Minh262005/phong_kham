import HomeHeaderService from "../../module/home/HomeHeaderService";
import Footer from "../../module/home/Footer";
import AdminContent from "../../module/admin/AdminContent";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { publicPort } from "components/url/link";
import { downloadExcel } from "react-export-table-to-excel";

function AdminPages() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        const mal = decoded.sub;
        setMail(mal);
        setRole(role);
        if (role !== "ADMIN") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  ///call curver data
  const [dataCurve, setDataCurve] = useState([
    {
      type: "",
      value: null,
    },
  ]);
  useEffect(() => {
    // Fetch data from the API
    axios
      .get(publicPort + "api/count-in-current-month")
      .then((response) => {
        const { online, completed, cancel } = response.data;
        // Update the state with the new data
        setDataCurve([
          {
            type: "Online",
            value: online,
          },
          {
            type: "Completed",
            value: completed,
          },
          {
            type: "Cancel",
            value: cancel,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  ////call number in spect
  const [dataNumS, setDataNums] = useState([]);
  // Tạo một mảng gồm 20 object để có đủ dữ liệu để cuộn lăn chuột
  useEffect(() => {
    const listSpec = async () => {
      try {
        const response = await axios.get(
          publicPort + "api/doctors/specialty?specialty=****"
        );
        setDataNums(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listSpec();
  }, []);

  ///// call number in a doctor
  const [dataNumD, setDataNumD] = useState([]);
  useEffect(() => {
    axios
      .get(publicPort + "api/countByDoctorOfData")
      .then((response) => {
        const newData = response.data.map((item) => ({
          Type: item.type,
          Name: item.name,
          Number: item.number,
        }));

        setDataNumD(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  ////call number book app doctor
  const [dataNumBD, setdataNumBD] = useState([]);
  // Tạo một mảng gồm 20 object để có đủ dữ liệu để cuộn lăn chuột
  useEffect(() => {
    const listDoctor = async () => {
      try {
        const response = await axios.get(
          publicPort + "api/countByDoctorOfApointment"
        );
        setdataNumBD(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listDoctor();
  }, []);

  ////////////download
  const header = ["admin data", ""];
  const body = [
    ...dataCurve,
    ...["Number spec "],
    ...dataNumS,
    ...["Number examination "],
    ...dataNumD,
    ...["Number booking "],
    ...dataNumBD,
  ];
  const handleDownloadExcel = () => {
    console.log("export");
    downloadExcel({
      fileName: "AdminDashboard",
      sheet: "Dashboard",
      tablePayload: {
        header,
        // accept two different data structures
        body,
      },
    });
  };

  return (
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] min-h-[1000px] bg-white flex justify-center">
        <div className="w-[80%] min-h-[1000px]">
          <div className="bg-white">
            <HomeHeaderServiceAdmin />
          </div>
          <div className="w-[100%] h-[200px] flex items-center">
            <h1 className="text-[40px] font-bold">Dashboard</h1>
            <div style={{ marginLeft: "84rem" }}>
              <button
                className="block  text-white rounded-full bg-gradient-to-br from-gradientLeft to-gradientRight"
                style={{ width: "14rem", height: "4rem" }}
                onClick={handleDownloadExcel}
              >
                Export excel
              </button>
            </div>
          </div>

          <div className="bg-white w-[100%] h-[1000px]">
            <AdminContent />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}
export default AdminPages;
