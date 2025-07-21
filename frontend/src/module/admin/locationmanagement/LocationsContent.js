import axios from "axios";
import React, { useState, useEffect } from "react";
import { publicPort } from "../../../components/url/link";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CiPen, CiTrash } from "react-icons/ci";

function LocationsContent({ role, mail }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const navigate = useNavigate();
  const listtitle = [
    {
      id: 1,
      title: "No",
    },
    {
      id: 2,
      title: "Name",
    },
    {
      id: 3,
      title: "Status",
    },
    {
      id: 4,
      title: "Description",
    },
    {
      id: 5,
      title: "Action",
    },
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const listApp = async () => {
      try {
        let response;

        response = await axios.get(publicPort + "location/listadmin");
        setListOrigin(response.data);
        setListData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, [mail, role]);

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

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    setInputValue(searchInput);
    if (searchInput === "") {
      setListData(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setListData(filteredList);
    }
  };
  const handleLocation = () => {
    navigate("/locations");
  };
  const handleSpec = () => {
    navigate("/specs");
  };
  const handleSymptom = () => {
    navigate("/symptoms");
  };
  const handleRole = () => {
    navigate("/roles");
  };
  const handleAddNewLocation = () => {
    navigate("/createlocation");
  };

  const [visibleItem, setVisibleItem] = useState(null);

  const handleShow = (index) => {
    // setshow(!show);
    if (visibleItem === index) {
      setVisibleItem(null);
    } else {
      setVisibleItem(index);
    }
  };

  const handleDelete = async (id) => {
    console.log("delete " + id);
    const response = await axios.get(publicPort + `location/block?id=${id}`);
    console.log(response.data);
    if (response.data == "Block success") {
      window.location.reload();
    } else {
      alert(response.data);
    }
  };

  const handleEditLo = (item) => {
    console.log("edit " + item);
    navigate("/editlocation", { state: { item } });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-2xl w-[100%] min-h-[500px]">
      <div>
        <span
          className={
            "ml-[50px] font-bold text-3xl mr-[100px] text-gradientLeft "
          }
          onClick={handleLocation}
        >
          LOCATIONS
        </span>
        <span
          className={"font-bold text-3xl mr-[100px] text-[#c5c4c4]"}
          onClick={handleSpec}
        >
          SPECIALTIES
        </span>
        <span
          className={"font-bold text-3xl mr-[100px] text-[#c5c4c4]"}
          onClick={handleSymptom}
        >
          SYMPTOMS
        </span>
        <span
          className={"font-bold text-3xl mr-[100px] text-[#c5c4c4]"}
          onClick={handleRole}
        >
          ROLES
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
        <div className="h-[50px] w-[50%] flex justify-end items-center pt-[8rem]">
          <div
            className="  w-[40%] h-[40px] flex items-center justify-center rounded-3xl cursor-pointer"
            onClick={handleAddNewLocation}
          >
            {/* <span className="w-[10%] text-[30px] text-gradientLeft ]">
              <AiOutlinePlusCircle />
            </span> */}
            <span className="font-medium underline text-success ">
              Add new location
            </span>
          </div>
        </div>
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
              {listData.map((listD, index) => (
                <tr
                  className={`text-center  ${
                    listD.id % 2 === 0 ? "bg-white  " : "  bg-[#e2edff] "
                  }`}
                  key={listD.id}
                >
                  <td className="w-[10%]">{listD.id}</td>
                  <td className="w-[15%]  ">{listD.name}</td>
                  <td className="w-[12%]">
                    <p
                      className={`w-[70%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${
                        listD.commandFlag == "0"
                          ? "bg-success"
                          : listD.commandFlag == "2"
                          ? "bg-error"
                          : "bg-warning"
                      }`}
                    >
                      {listD.commandFlag == 0
                        ? "Active"
                        : listD.commandFlag == 1
                        ? ""
                        : "Blocked"}
                    </p>
                  </td>
                  <td className="w-[15%]  ">{listD.description}</td>
                  <td className="pb-[10px] pt-[10px]  w-[13%]">
                    <button onClick={() => handleShow(index)}>:</button>
                    {visibleItem === index && (
                      <div
                        className="ml-[6.5rem] w-[45%] "
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          background: "#ececec",
                          // fontSize:""
                          borderRadius: "1rem",
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <span
                          onClick={() => handleEditLo(listD)}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            margin: "1rem",
                          }}
                        >
                          <p>
                            <CiPen />
                          </p>
                          <p>Edit</p>
                        </span>

                        <span
                          onClick={() => handleDelete(listD.id)}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            margin: "1rem",
                          }}
                        >
                          <p>
                            <CiTrash />
                          </p>
                          <p>Block</p>
                        </span>
                      </div>
                    )}
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
export default LocationsContent;
