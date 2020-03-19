import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import DayListItem from "components/DayListItem";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors";


// const [days, setDays] = useState("")

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Steven boi",
//       interviewer: {
//         id: 1,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "victor man",
//       interviewer: {
//         id: 1,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];

export default function Application(props) {

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(state => ({ ...state, day }));
  const setDays = days => setState(state => ({ ...state, days }));

  // useEffect(() => {
  //   axios.get("http://localhost:8001/api/days")
  //   .then(resp => {
  //     // console.log(resp)
  //     // setDays(() => resp.data)
  //     // setState(prev => ({ ...prev, days }));
  //     // setState(state => ({...state, days: resp.data}))
  //     setDays(resp.data)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // }, []);
  useEffect(() => {
  Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
  ]).then((all) => {
    // console.log("this",all)
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
  })
    .catch(err => {
      console.error(err)
    })
  }, [])

  const appointments = getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => (<Appointment key={appointment.id} {...appointment} />))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
