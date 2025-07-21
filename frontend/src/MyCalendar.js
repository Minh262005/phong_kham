import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { localPort, publicPort } from "components/url/link";
import axios from "axios";

function MyCalendar() {
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const handleDateSelect = (arg) => {
    console.log(arg);
  };
  useEffect(() => {
    const listApp = async () => {
      try {
        const response = await axios.get(
          publicPort + `schedule/listschedules?email=hodacdat12345@gmail.com`
        );
        console.log(response.data);
        setListOrigin(response.data);
        setListData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      slotMinTime="08:00:00"
      slotMaxTime="17:00:00"
      selectable={true}
      events={[
        {
          title: "Event 1",
          start: "2023/07/14T2:30PM",
          end: "2023/07/14T3:00PM",
          color: "red",
        },
        {
          title: "Event 2",
          start: "2023-07-14T14:30:00",
          end: "2023-07-14T16:00:00",
        },
      ]}
      // eventTimeFormat={{
      //   hour: "numeric",
      //   minute: "2-digit",
      //   meridiem: true,
      //   hour12: true,
      // }}
      select={handleDateSelect}
    />
  );
}

export default MyCalendar;
