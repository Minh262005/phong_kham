import React from "react";
import IconClose from "../../icon/IconClose";
import IconSearch from "../../icon/IconSearch";
import Button from "../button/Button";

const PopupSymptom = ({
  header,
  describe,
  handleClose,
  listData,
  handleSearchInputChange,
  changeSymtomList,
  numberOfSym,
  nextSpec,
  symtomArr,
}) => {

  function checkIdExists(idToCheck) {
    return symtomArr.some(item => item.id === idToCheck);
  }

  return (
    <div className="p-[3.2rem_7.4rem] rounded-[1.6rem] bg-white">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[3.2rem] text-black1 font-semibold">{header}</h3>{" "}
        <span onClick={handleClose} className="cursor-pointer">
          <IconClose></IconClose>
        </span>
      </div>
      <span className="mt-[0.8rem] text-[#8D8B8B]">{describe} </span>
      <span
        className="text-success"
        style={{
          fontSize: "16px",
          fontWeight: "700",
          fontFamily: "sora",
          lineHeight: "24px",
          fontStyle: "normal",
        }}
      >
        ({numberOfSym})
      </span>
      <div className="mt-[3.3rem]">
        <div className="p-[1.4rem_2.5rem] border border-[#8D8B8B] relative rounded-[0.8rem]">
          <input
            onChange={handleSearchInputChange}
            className="ml-[5rem] "
            style={{ width: "90%" }}
            placeholder="Search symptom"
            type="search"
          />
         
          <div className="absolute top-2/4 left-[2.4rem] -translate-y-2/4">
            <IconSearch></IconSearch>
          </div>
         
        </div>
        <div className="overflow-auto gap-[0.8rem] max-h-[40rem] mt-[2.4rem]">
          {listData?.length > 0 &&
            listData.map((item) => {
              return checkIdExists(item.id) === true ? (
                <div
                  onClick={() => changeSymtomList(item)}
                  key={item.id}
                  className="shadow-md text-success font-semibold text-[2rem] p-[2.7rem_4.7rem] rounded-[1.6rem] cursor-pointer"
                  style={{ border: "1px solid green", marginBottom: "1rem" }}
                >
                  {item.name}
                </div>
              ) : (
                <div
                  onClick={() => changeSymtomList(item)}
                  key={item.id}
                  className="shadow-md font-semibold text-[2rem] p-[2.7rem_4.7rem] rounded-[1.6rem] cursor-pointer"
                  style={{ marginBottom: "1rem" }}
                >
                  {item.name}
                </div>
              );
              }
            )}
        </div>
        {numberOfSym > 0 ? (
          <Button onClick={() => nextSpec()}>Next</Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PopupSymptom;
