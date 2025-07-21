import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { publicPort } from "components/url/link";

const AdminContentRow = () => {
  const [data, setData] = useState([]); 
  useEffect(() => {
   
    axios
      .get(publicPort + "api/countByDoctorOfData")
      .then((response) => {
        const newData = response.data.map((item) => ({
          Type: item.type,
          Name: item.name,
          Number: item.number,
        }));

        
        setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  const config = {
    data,
    isGroup: true,
    xField: "Name",
    yField: "Number",
    seriesField: "Type",
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      <Column {...config} className="w-[90%]" />
    </div>
  );
};
export default AdminContentRow;
