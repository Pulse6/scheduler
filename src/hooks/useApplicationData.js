import React, { useState, useEffect } from "react";
import axios from "axios";
/////////////////////////////////////////////
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState(state => ({ ...state, day }));
  // const setDays = days => setState(state => ({ ...state, days }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(state => ({ ...state, appointments }))
      })
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(state => ({ ...state, appointments }))
      })
  }
//////////////////////////////////////////
  function update(id, interview) {
    if (!interview) {
      const appointment = {
        ...state.appointments[id],
        interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(state => ({ ...state, appointments }))
    } else {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
    };
      const appointments = {
        ...state.appointments,
        [id]: appointment
    };
    setState(state => ({ ...state, appointments }))
    }
  }

  useEffect(() => {
    socket.onopen = function () {
      socket.send("ping")
    }
    // socket.close()
  }, [])

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data)
    if (message.type === "SET_INTERVIEW") {
      update(message.id, message.interview)
    }
  }
  //////////////////////////////////////////

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then(days => setState(state => ({ ...state, days: days.data })))
  }, [state.appointments])

  //   useEffect(() => {
  //   axios.get("http://localhost:8001/api/appointments")
  //     .then(appointments => setState(state => ({ ...state, appointments: appointments.data })))
  // }, [state.appointments])

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return { state, setDay, bookInterview, deleteInterview }
}