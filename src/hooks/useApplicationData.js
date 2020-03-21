import React, { useState, useEffect } from "react";
import axios from "axios";


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
    // console.log(id, interview);
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
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
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

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      // console.log("this",all)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      // console.log(interviewers)
    })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {state, setDay, bookInterview, deleteInterview }
}



