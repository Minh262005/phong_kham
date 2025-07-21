import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaHospital } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../url/firebase";
import { v4 } from "uuid";

export default function DoctorList({
  docList,
  searchspec,
  searchlocation,
  searchname,
  role,
}) {
  const navigate = useNavigate();
  const [listOrigin, setListOrigin] = useState(docList);
  const [specList, setSpecList] = useState(docList);
  const [searchList, setSearchList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  useEffect(() => {
    setListOrigin(docList);
    setSpecList(docList);
  }, [docList]);

  useEffect(() => {
    if (searchspec != undefined && searchlocation != undefined) {
      const places = async () => {
        const findItemByName = (name, name1) => {
          if (name.spc == "" && name1.lo == "") {
            return listOrigin;
          } else if (name.spc == "" && name1.lo != "") {
            return listOrigin.filter(
              (item1) => item1.workingPlace.id == name1.lo
            );
          } else if (name.spc != "" && name1.lo == "") {
            return listOrigin.filter((item) => item.specialty.id == name.spc);
          } else {
            return listOrigin
              .filter((item) => item.specialty.id == name.spc)
              .filter((item1) => item1.workingPlace.id == name1.lo);
          }
        };

        const selectedItem = findItemByName(searchspec, searchlocation);

        setSpecList(selectedItem);
      };
      places();
    }
  }, [searchspec, searchlocation]);

  useEffect(() => {
    if (searchname != undefined) {
      const places = async () => {
        const findItemByName = (name) => {
          if (name.sn == "") {
            return listOrigin;
          } else {
            return listOrigin.filter((item) =>
              item.name.toLowerCase().includes(searchname.sn.toLowerCase())
            );
          }
        };

        const selectedItem = findItemByName(searchname);

        setSpecList(selectedItem);
      };
      places();
    }
  }, [searchname]);

  useEffect(() => {
    setSpecList(docList?.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage]);

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setSpecList(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSpecList(filteredList);
    }
  };

  const view_detail = (item) => {
    const id = item.id;
    // console.log(id);
    if (role != "USER") {
      navigate("/informationdoctorstaff", { state: { id } });
    } else {
      navigate("/doctorinformation", { state: { id } });
    }
  };

  const book_appointment = (item) => {
    console.log(item);
    navigate("/book_appointment", { state: { item } });
  };

  function handlePageClick(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  function handleItemsPerPageChange(event) {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(docList?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [avatarUrl, setAvatarUrl] = useState(null);
  const getAvatarUrl = async (imageName) => {
    try {
      const storageRef = ref(storage, `${imageName}`); // No need to concatenate the image name with v4() here
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error getting avatar URL: ", error);
      return null;
    }
  };
  const [avatarUrls, setAvatarUrls] = useState({}); 
  useEffect(() => {
    if (docList?.length > 0) {
      docList.forEach((item) => {
        const avatarName = item.avatar;
        getAvatarUrl(avatarName).then((url) => {
          // Sử dụng cập nhật state để lưu trữ avatarUrl dựa trên data.id
          setAvatarUrls((prevUrls) => ({
            ...prevUrls,
            [item.id]: url,
          }));
        });
      });
    }
  }, [docList]);

  return (
    <div>
      <div>
        {specList?.map((data) => (
          <div
            key={data.id}
            className=" w-[100%] h-[150px] mb-[20px] rounded-[15px]"
          >
            <div
              className="flex p-4 relative bg-white rounded-[15px] shadow-xl"
              key={data.id}
            >
              <div className="w-[15%] h-[120px] rounded-[15px] overflow-hidden mr-[30px] mt-2 ">
                <img className="w-[100%]"  src={avatarUrls[data.id]}  alt="avatar" />
              </div>
              <div className="w-[85%] pr-[20%]">
                <h1 className="font-semibold">{data.name}</h1>
                <div className="flex">
                  <div className="pr-[5px] text-5xl">
                    <IoIosSchool />
                  </div>
                  <a className="text-2xl font-light ">{data.education}</a>
                </div>
                <div className="flex pt-1">
                  <div className="pr-[10px] text-4xl">
                    <FaHospital />
                  </div>
                  <a className="text-2xl font-light">
                    {data.workingPlace.name}
                  </a>
                </div>
                <div>
                  <span className="text-lg font-light">
                    {data.specialty.name}
                  </span>
                  <span className=" text-lg text-gradientLeft cursor-pointer">
                    <p onClick={() => view_detail(data)}> Read more</p>
                  </span>
                </div>
                <div className="absolute top-8 right-8">
                  <button
                    className=" bg-blue-700 w-[200px] h-[40px] rounded-[10px] text-white"
                    style={{ backgroundColor: "#3A8EF6" }}
                    onClick={() => book_appointment(data)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="" style={{ textAlign: "center" }}>
        <div>
          {pageNumbers?.map((pageNumber) => (
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
            <option value="1">1 per page</option>
            <option value="7">7 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
