import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const listData = [
  {
    id: 1,
    month: "February",
    day: "13th",
    name: "Nguyen Quang Hung",
    phone: "0817411132",
    type: "Nutrition",
    time: "10:30, 12/06/2023",
  },
  {
    id: 2,
    month: "February",
    day: "13th",
    name: "Nguyen Quang Hung",
    phone: "0817411132",
    type: "Nutrition",
    time: "10:30, 12/06/2023",
  },

  {
    id: 3,
    month: "February",
    day: "13th",
    name: "Nguyen Quang Hung",
    phone: "0817411132",
    type: "Nutrition",
    time: "10:30, 12/06/2023",
  },
  {
    id: 4,
    month: "February",
    day: "13th",
    name: "Nguyen Quang Hung",
    phone: "0817411132",
    type: "Nutrition",
    time: "10:30, 12/06/2023",
  },
  {
    id: 5,
    month: "February",
    day: "13th",
    name: "Nguyen Quang Hung",
    phone: "0817411132",
    type: "Nutrition",
    time: "10:30, 12/06/2023",
  },
];

function AppointmentConfirm({ listConFirm }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [listData, setListData] = useState(listConFirm);
  const [listOrigin, setListOrigin] = useState(listConFirm);
  useEffect(() => {
    setListOrigin(listConFirm);
    setListData(listConFirm);
  }, [listConFirm]);
  const handleDetail = (appointment) => {
    console.log(appointment);
    navigate("/appointmentdetailsfornurse", { state: { appointment } });
  };
  useEffect(() => {
    setListData(listOrigin?.slice(indexOfFirstItem, indexOfLastItem));
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
  for (let i = 1; i <= Math.ceil(listOrigin?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <div className="bg-white flex justify-center w-[100%]">
        <div className="w-[90%]">
          <div className="w-[100%] min-h-[500px] bg-white ">
            {listData?.map((data) => (
              <div
                className="flex justify-between w-[100%] border-[1px] border-[#dddddd] rounded-2xl min-h-[110px] mb-[20px]"
                key={data.id}
              >
                <div className="flex w-[80%] ">
                  <div className="w-[15%]  flex justify-center items-center text-gradientLeft border-r-[2px] border-[#ddd]">
                    <div>
                      {/* <h1 className="w-[100%]">{data.id}</h1> */}
                      <h1 className="w-[100%] flex justify-center font-bold">
                        {data.id}
                      </h1>
                    </div>
                  </div>
                  <div className="w-[70%] ml-[5%] ">
                    <h1 className="font-bold text-[#6c87ae]">
                      {data.patientName}
                    </h1>
                    <div className="pt-[10px]">
                      <p className="text-[14px] text-[#9b9999]">
                        {data.examDate}
                      </p>
                      <p className="text-[14px] text-[#9b9999]">
                        {data.examTime}
                      </p>
                      <p className="text-warning">
                        {data.doctorName} _ {data.speciatly} _ {data.bookPlace}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" w-[20%] flex justify-center items-center">
                  <div className="bg-gradientLeft w-[60%] h-[40px] flex justify-center items-center rounded-2xl text-white">
                    <button onClick={() => handleDetail(data)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
export default AppointmentConfirm;
