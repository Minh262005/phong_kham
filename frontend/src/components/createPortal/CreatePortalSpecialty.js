import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import PopupSpec from "../propup/PopupSpec";
import axios from "axios";
import { publicPort } from "../url/link";

const CreatePortalSpecialty = ({
  visible,
  onClose,
  handleClose,
  changeSpecList,
  spec,
  symtomArr,
  checkinSpec,
}) => {
  const [specList, setSpecList] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [specListSearch, setSpecListSearch] = useState([]);

  useEffect(() => {
    const specs = async () => {
      try {
        const response = await axios.get(publicPort + "spec/list");
        setSpecList(response.data);
        setListOrigin(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    specs();
  }, []);

  useEffect(() => {
    if (checkinSpec != undefined) {
      const places = async () => {
        // console.log(checkinSpec);
        const response = await axios.get(publicPort + "spec/list");
        const findItemByName = (name) => {
          return response.data.find((item) => item.name === name);
        };
        // console.log(place);
        const selectedItem = findItemByName(checkinSpec);
        // console.log(selectedItem);
        changeSpecList(selectedItem);
      };
      places();
    }
  }, [checkinSpec]);

  useEffect(() => {
    setSpecList([]);
    setSpecListSearch([]);
  }, [symtomArr]);

  useEffect(() => {
    const newArr = [];
    if (symtomArr.length > 0) {
      symtomArr.map((item) => {
        listOrigin.map((item1) => {
          if (item1.id === item.specialty.id) {
            if (newArr.includes(item1.name) !== true) {
              newArr.push(item1.name);
              setSpecList((prevItems) => [...prevItems, item1]);
              setSpecListSearch((prevItems) => [...prevItems, item1]);
            }
          }
        });
      });
    } else {
      setSpecList(listOrigin);
      setSpecListSearch(listOrigin);
    }
  }, [symtomArr]);

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setSpecList(listOrigin);
    } else {
      const filteredList = specListSearch.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSpecList(filteredList);
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
              <PopupSpec
                spec={spec}
                handleSearchInputChange={handleSearchInputChange}
                changeSpecList={changeSpecList}
                listData={specList}
                handleClose={onClose}
                header="Specialty list"
                describe="Select a Specialty"
              ></PopupSpec>
            </div>
          </div>,
          document.body
        )
      }
    </CSSTransition>
  );
};

export default CreatePortalSpecialty;
