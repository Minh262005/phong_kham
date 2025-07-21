import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import PopupDoctor from "../propup/PopupDoctor";
import axios from "axios";
import { publicPort } from "../url/link";
const CreatePortalDoctor = ({
  visible,
  onClose,
  handleClose,
  changeDoctorList,
  spec,
  doctor,
  place,
  checkindoc,
}) => {
  const [doctorList, setDoctorList] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [doctorListSearch, setDoctorListSearch] = useState();
  useEffect(() => {
    const doctos = async () => {
      try {
        const response = await axios.get(
          publicPort + `api/list_lo/${place.id}`
        );
        setDoctorList(response.data);
        setListOrigin(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    doctos();
  }, [place]);

  useEffect(() => {
    // console.log(checkindoc);
    // console.log(doctor);
    if (checkindoc != undefined) {
      const places = async () => {
        const response = await axios.get(publicPort + `api/doctors`);
        // console.log(response.data);
        const findItemByName = (name) => {
          return response.data.find((item) => item.name == name);
        };
        const selectedItem = findItemByName(checkindoc);
        changeDoctorList(selectedItem);
      };
      places();
    }
  }, [checkindoc]);

  useEffect(() => {
    setDoctorList([]);
    setDoctorListSearch([]);
  }, [spec]);

  useEffect(() => {
    setDoctorList(listOrigin);
    setDoctorListSearch(listOrigin);
    if (spec !== undefined) {
      const filteredItems = doctorList.filter((item) => {
        return (
          item.role.id === 3 &&
          null !== item.specialty &&
          spec.id == item.specialty.id
        );
      });
      setDoctorList(filteredItems);
      setDoctorListSearch(filteredItems);
    } else {
      setDoctorList(listOrigin);
      setDoctorListSearch(listOrigin);
    }
  }, [spec]);

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setDoctorList(listOrigin);
    } else {
      const filteredList = doctorListSearch.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      setDoctorList(filteredList);
    }
  };

  return (
    <CSSTransition
      in={visible}
      timeout={200}
      unmountOnExit
      classNames="my-node"
    >
      {(state) =>
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-5  ${
              visible ? "" : "opacity-0 invisible"
            }`}
          >
            <div
              className="absolute inset-0 bg-black1 bg-opacity-40 overlay"
              onClick={handleClose}
            ></div>
            <div className="bg-white z-50 p-[2rem_3rem] shadow-md content absolute rounded-lg max-w-[70rem] w-full">
              <PopupDoctor
                doctor={doctor}
                handleSearchInputChange={handleSearchInputChange}
                changeDoctorList={changeDoctorList}
                listData={doctorList}
                handleClose={onClose}
                header="Doctor list"
                describe="Select a Doctor"
              ></PopupDoctor>
            </div>
          </div>,
          document.body
        )
      }
    </CSSTransition>
  );
};

export default CreatePortalDoctor;
