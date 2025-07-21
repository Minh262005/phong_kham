import axios from "axios";
import React, { useState, useEffect } from "react";
import { publicPort } from "../../components/url/link";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function CheckinListContent({ email, role }) {
  const [sortedObjects, setSortedObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");

  const [Email, setMail] = useState();
  const [rol, setRol] = useState();
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [doct, setDoct] = useState();
  const navigate = useNavigate();
  const listtitle = [
    {
      id: 1,
      title: "Ex-No",
    },
    {
      id: 2,
      title: "Patient Name",
    },
    {
      id: 3,
      title: "Date",
    },
    {
      id: 4,
      title: "Checkin Time",
    },
    {
      id: 5,
      title: "Appointment",
    },
    {
      id: 6,
      title: "Status",
    },
    {
      id: 7,
      title: "View Details",
    },
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [inputValue, setInputValue] = useState("");
  const currentItems = listOrigin.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (email == undefined) {
      setMail(email);
    }
    let r;
    let m;

    const storedName = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(storedName);
      const ro = decoded.roles[0].authority;
      r = ro;
      setRol(ro);
      setMail(decoded.sub);
      m = decoded.sub;
      // console.log(decoded.sub);
    } catch (error) {
      console.log(error);
    }

    const listApp = async () => {
      try {
        let response;
        let response1;
        if (r == "DOCTOR") {
          response = await axios.get(
            publicPort + `api/internal-accounts/search-email?email=${m}`
          );

          response1 = await axios.get(
            publicPort + `checkin/listbydoctorid?doctorId=${response.data.id}`
          );
        } else if (r == "USER") {
          response = await axios.get(publicPort + `patient/profile?email=${m}`);

          response1 = await axios.get(
            publicPort +
              `checkin/listBypaintedId?painted_id=${response.data.id}`
          );
        } else {
          response1 = await axios.get(publicPort + `checkin/list`);
        }
        const sortedData = response1.data.sort((a, b) => {
          // Convert commandFlag values to numbers for comparison (assuming they are strings).
          const commandFlagA = Number(a.commandFlag);
          const commandFlagB = Number(b.commandFlag);

          if (commandFlagA !== commandFlagB) {
            // Sort by 'commandFlag' in ascending order.
            return commandFlagA - commandFlagB;
          } else {
            // If 'commandFlag' is the same, sort by 'examDate' in ascending order.
            const examDateA = new Date(a.examDate);
            const examDateB = new Date(b.examDate);
            return examDateA - examDateB;
          }
        });
        // console.log(response1.data);
        setListOrigin(response1.data);
        setListData(response1.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, [Email, role]);

  useEffect(() => {
    setListData(listOrigin.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage]);

  function handlePageClick(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  function handleItemsPerPageChange(event) {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listOrigin.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleFilter = (status) => {
    setStatusFilter(status);

    if (status === "All") {
      setListData(listOrigin.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      const filteredList = listOrigin.filter(
        (item) => item.commandFlag == status
      );
      setListData(filteredList.slice(indexOfFirstItem, indexOfLastItem));
    }
  };

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    setInputValue(searchInput);
    if (searchInput === "") {
      setListData(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.patientName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setListData(filteredList);
    }
  };

  const handleDetail = (checkin) => {
    console.log(checkin);
    navigate("/checindetails", { state: { checkin } });
  };
  const handleAddNewCheckin = () => {
    navigate("/checkin");
  };
  const handleChangeTime = (time) => {
    const [date, hour] = time.split(" ");
    return hour.substring(0, 5);
  };

  const [appdata, setappdata] = useState([]);
  useEffect(() => {
    try {
      const findAppointment = async () => {
        const response = await axios.get(publicPort + `appointment/list`);
        // console.log(response.data);
        setappdata(response.data);
      };

      findAppointment();
    } catch (error) {}
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-2xl w-[100%] min-h-[500px] pt-[5rem]">
      <div>
        <span
          className={
            statusFilter === "All"
              ? "ml-[50px] font-bold text-3xl mr-[100px] text-gradientLeft "
              : "ml-[50px] font-bold text-3xl mr-[100px] text-[#c5c4c4]"
          }
          onClick={() => handleFilter("All")}
        >
          ALL
        </span>
        <span
          className={
            statusFilter === "0"
              ? "font-bold text-3xl mr-[100px] text-gradientLeft "
              : "font-bold text-3xl mr-[100px] text-[#c5c4c4]"
          }
          onClick={() => handleFilter("0")}
        >
          CHECKIN
        </span>
        <span
          className={
            statusFilter === "1"
              ? "font-bold text-3xl mr-[100px] text-gradientLeft "
              : "font-bold text-3xl mr-[100px] text-[#c5c4c4]"
          }
          onClick={() => handleFilter("1")}
        >
          EXAMINATING
        </span>
        <span
          className={
            statusFilter === "2"
              ? "font-bold text-3xl mr-[100px] text-gradientLeft "
              : "font-bold text-3xl mr-[100px] text-[#c5c4c4]"
          }
          onClick={() => handleFilter("2")}
        >
          COMPLETED
        </span>
        <span
          className={
            statusFilter === "3"
              ? "font-bold text-3xl mr-[100px] text-gradientLeft "
              : "font-bold text-3xl mr-[100px] text-[#c5c4c4]"
          }
          onClick={() => handleFilter("3")}
        >
          CANCEL
        </span>
      </div>
      <div className="w-[100%] h-[50px] flex justify-between mb-[5rem]">
        <div className="mt-[40px] h-[50px] w-[30%] border-[1px] rounded-2xl flex border-[#c5c4c4] ml-[10px]">
          <button className="w-[15%]">
            <BiSearch className="text-[25px] ml-[13px] text-[#c5c4c4]" />
          </button>
          <input
            placeholder="Search"
            className="w-[83%] h-[100%] "
            onChange={handleSearchInputChange}
          />
        </div>
        {role == "NURSE" ? (
          <>
            <div className="h-[50px] w-[50%] flex justify-end items-center pt-[8rem]">
              <div
                className="  w-[40%] h-[40px] flex items-center justify-center rounded-3xl cursor-pointer"
                onClick={handleAddNewCheckin}
              >
                <span className="font-medium underline text-success ">
                  Add new check-in
                </span>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="">
        <div>
          <table className="w-[100%]">
            <thead className="h-[100px]">
              <tr className="text-[30px]">
                {listtitle.map((data) => (
                  <th
                    key={data.id}
                    className=" text-[#8d8b8b] w-[1%] text-center"
                  >
                    {data.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-[100%] h-[200px]">
              {listData.map((listD) => (
                <tr
                  className={`text-center  ${
                    listD.id % 2 === 0 ? "bg-white  " : "  bg-[#e2edff] "
                  }`}
                  key={listD.id}
                >
                  <td className="w-[10%]">
                    {listD != undefined ? listD.id : ""}
                  </td>
                  <td className="w-[13%]">
                    {listD != undefined ? listD.patientName : ""}
                  </td>
                  <td className="w-[13%]">
                    <p className="ml-[20%]">
                      {listD != undefined ? listD.examDate : ""}
                    </p>
                  </td>
                  <td className="w-[13%]">
                    <p className="ml-[20%]">
                      {listD != undefined
                        ? handleChangeTime(listD.registerTime)
                        : ""}
                    </p>
                  </td>
                  <td className="w-[13%]">
                    <p className="ml-[20%]">
                      {listD !== undefined && listD?.appointmentId
                        ? appdata.map((item) =>
                            listD?.appointmentId == item.id ? item.examTime : ""
                          )
                        : ""}
                    </p>
                  </td>

                  <td className="w-[12%]">
                    <p
                      className={`w-[70%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${
                        listD.commandFlag == "0"
                          ? "bg-[#9747ff]"
                          : listD.commandFlag == "1"
                          ? "bg-[#6c87ae]"
                          : listD.commandFlag == "2"
                          ? "bg-success"
                          : "bg-error"
                      }`}
                    >
                      {listD.commandFlag == 0
                        ? "Checked-in"
                        : listD.commandFlag == 1
                        ? "Examining"
                        : listD.commandFlag == 2
                        ? "Completed"
                        : "Cancel"}
                    </p>
                  </td>
                  <td className="pb-[10px] pt-[10px]  w-[13%]">
                    <button
                      className="w-[80%] h-[40px] bg-gradientLeft rounded-3xl text-white "
                      onClick={() => handleDetail(listD)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="" style={{ textAlign: "center" }}>
        <div>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={(event) => handlePageClick(event, pageNumber)}
              style={{ margin: "5px" }}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <div>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="3">3 per page</option>
            <option value="7">7 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default CheckinListContent;
