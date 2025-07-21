import axios from "axios";
import { publicPort } from "components/url/link";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MedicalHistoryContent({ email, role }) {
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [Email, setMail] = useState();
  const [rol, setRol] = useState();
  // const [time, settime] = useState();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     settime(1); // reload the component after 1 second
  //   }, 1000);

  //   return () => clearTimeout(timer); // clear the timer on unmount
  // }, []);

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
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(email);
    if (email == undefined) {
      setMail(email);
    }
    let r;
    let m;

    const storedName = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      r = role;
      setRol(role);
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
            publicPort + `medicalrecord/listByDoctorId?id=${response.data.id}`
          );
        } else if (r == "USER") {
          response = await axios.get(publicPort + `patient/profile?email=${m}`);

          response1 = await axios.get(
            publicPort + `medicalrecord/listByPatientId?id=${response.data.id}`
          );
        } else {
          response1 = await axios.get(publicPort + `medicalrecord/list`);
        }
        // console.log(response1.data);
        setListOrigin(response1.data);
        setListData(response1.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, [Email, rol]);

  useEffect(() => {
    setListData(listOrigin?.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage]);

  const handleDetails = (checkin) => {
    navigate("/medicaldetails", { state: { checkin } });
  };

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setListData(listOrigin);
    } else {
      const filteredList = listOrigin?.filter((item) =>
        item.checkin?.patientName
          ?.toLowerCase()
          .includes(searchInput.toLowerCase())
      );
      setListData(filteredList);
    }
  };

  const formatDateToRight = (dateString) => {
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(formattedDate);
    return formattedDate;
  };
  return (
    <div className="bg-white">
      <div className="flex w-[100%] items-center pb-[30px] mt-[5rem]">
        <div className=" w-[50%]  text-6xl font-bold">
          <h1>Medical History</h1>
        </div>
        <div className="h-[50px] w-[50%] flex justify-end items-center">
          <div className="border-[1px] border-[#dddddd]  w-[40%] h-[40px] flex items-center justify-center rounded-3xl cursor-pointer">
            <input
              onChange={handleSearchInputChange}
              className="w-[80%] h-[100%]"
              placeholder="Search "
            />
            <span className="font-medium text-[#dddddd] w-[10%] text-[30px]">
              <GoSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="w-[100%] min-h-[500px] bg-white ">
        {listData.map((checkin) => (
          <div
            className="flex justify-between w-[100%] shadow-xl rounded-2xl min-h-[110px] mb-[50px]"
            key={checkin.id}
          >
            <div className="flex w-[80%] ">
              <div className="w-[15%]  flex justify-center items-center text-gradientLeft border-r-[2px] border-[#ddd]">
                <div>
                  {/* <h1 className="w-[100%]">{data.month}</h1> */}
                  <h1 className="w-[100%] flex justify-center font-bold">
                    {checkin.id}
                  </h1>
                </div>
              </div>
              <div className="w-[70%] ml-[5%] ">
                <h1 className="font-bold text-[#6c87ae]">
                  {checkin.checkin.patientName}
                </h1>
                <div className="">
                  <p className="text-[14px] text-[#9b9999]">
                    {checkin.checkin.bookPlace}
                  </p>
                  <p className="text-[14px] text-[#9b9999]">
                    {checkin.checkin.phone}
                  </p>
                  <p className="text-[14px] text-[#9b9999]">
                    {checkin.checkin.speciatly}
                  </p>
                  <p className="text-warning">
                    {formatDateToRight(checkin.releaseTime)}
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-[20%] flex justify-center items-center">
              <div className="bg-gradientLeft w-[60%] h-[40px] flex justify-center items-center rounded-2xl text-white">
                <button onClick={() => handleDetails(checkin)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="" style={{ textAlign: "center" }}>
        {/* <button className="button text-[30px] w-10 h-10 bg-gradientLeft mr-[30px]">
          <MdKeyboardArrowLeft className="ml-[2px]" />
        </button>

        <button className="button text-[30px] w-10 h-10 bg-gradientLeft">
          <MdKeyboardArrowRight className="ml-[3px]" />
        </button> */}

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
export default MedicalHistoryContent;
