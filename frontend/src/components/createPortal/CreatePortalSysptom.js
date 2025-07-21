import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import PopupSymptom from "../propup/PopupSymptom";
import axios from "axios";
import { publicPort } from "../url/link";
const CreatePortalSysptom = ({
  visible,
  onClose,
  handleClose,
  changeSymtomList,
  numberOfSym,
  nextSpec,
  symtomArr,
  checkinsymptom,
}) => {
  const [symptomList, setSymtomList] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [symarr, setsymarr] = useState(checkinsymptom);

  useEffect(() => {
    const symptoms = async () => {
      try {
        const response = await axios.get(publicPort + "symptom/list");
        setSymtomList(response.data);
        setListOrigin(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    symptoms();

    setsymarr(checkinsymptom);
  }, []);

  useEffect(() => {
    if (checkinsymptom != undefined) {
      const places = async () => {
        const response = await axios.get(publicPort + "symptom/list");

        for (let i = 0; i < listOrigin.length; i++) {
          if (
            checkinsymptom
              .toLowerCase()
              .includes(response.data[i].name.toLowerCase())
          ) {
            changeSymtomList(response.data[i]);
          }
        }
      };
      places();
    }
  }, [listOrigin]);

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setSymtomList(listOrigin);
    } else {
      const filteredList = symptomList.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSymtomList(filteredList);
    }
  };
  return (
    <CSSTransition
      in={visible}
      timeout={200}
      unmountOnExit
      classNames="my-node"
    >
      {() =>
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
              <PopupSymptom
                symtomArr={symtomArr}
                nextSpec={nextSpec}
                numberOfSym={numberOfSym}
                handleSearchInputChange={handleSearchInputChange}
                changeSymtomList={changeSymtomList}
                listData={symptomList}
                handleClose={onClose}
                header="Symptom list"
                describe="Choose a symptom"
              ></PopupSymptom>
            </div>
          </div>,
          document.body
        )
      }
    </CSSTransition>
  );
};

export default CreatePortalSysptom;
