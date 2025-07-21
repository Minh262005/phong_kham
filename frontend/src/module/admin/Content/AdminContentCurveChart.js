import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";
import { publicPort } from "components/url/link";

const AdminContentCurveChart = () => {
  const [data, setData] = useState([
    {
      type: "Online",
      value: 33.33,
    },
    {
      type: "Completed",
      value: 33.33,
    },
    {
      type: "Cancel",
      value: 33.33,
    },
  ]);
  useEffect(() => {
    // Fetch data from the API
    axios.get(publicPort + "api/count-in-current-month")
      .then(response => {
        const { online, completed, cancel } = response.data;
        // Update the state with the new data
        setData([
          {
            type: "Online",
            value: online,
          },
          {
            type: "Completed",
            value: completed,
          },
          {
            type: "Cancel",
            value: cancel,
          },
        ]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default AdminContentCurveChart;
