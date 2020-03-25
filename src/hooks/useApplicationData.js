import { useState, useEffect } from "react";
import axios from "axios";
//           for socket               //
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState(state => ({ ...state, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(state => ({ ...state, appointments }))
        Promise.all([axios.get(`/api/days`)]).then(([days]) => {
          setState(prev => ({
            ...prev,
            days: days.data
          }));
        });
      })
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({ ...prev, appointments }));
      Promise.all([axios.get(`/api/days`)]).then(([days]) => {
        setState(prev => ({
          ...prev,
          days: days.data
        }));
      });
    });
  }

  //           for socket               //
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

  // useEffect(() => {
  //   axios.get("/api/days")
  //     .then(days => setState(state => ({ ...state, days: days.data })))
  // }, [state.appointments])

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return { state, setDay, bookInterview, deleteInterview }
}