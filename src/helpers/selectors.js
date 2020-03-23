const getAppointmentsForDay = (state, day) => {
  let filteredDays = state.days.filter(thisDay => thisDay.name === day);
  if (filteredDays === [] || !day || filteredDays[0] === undefined) {
    return []
  }

  const { appointments } = filteredDays[0]
  const answer = []

  for (let appointment of Object.values(state.appointments)) {

    if (appointments.includes(appointment.id)) {
      answer.push(appointment)
    }
  }
  return answer;
}

const getInterview = (state, day) => {
  if (!day || !day.interviewer) {
    return null
  }
  return {
    ...day,
    interviewer: state.interviewers[day.interviewer],
  }
}

const getInterviewersForDay = (state, day) => {
  let filteredDays = state.days.filter(stateDay => day === stateDay.name);  
  if (!(filteredDays !== [] && day && filteredDays[0])) {
    return [];
  }  
  const { appointments } = filteredDays[0];
  const interviewers = [];
  
  for (let appointment of Object.values(state.appointments)) {
    if (!appointments.includes(appointment.id) && appointment.interview) {
      let interviewer = appointment.interview.interviewer.toString();
      if (!interviewers.includes(state.interviewers[interviewer])) {
        interviewers.push(state.interviewers[interviewer]);
      }
    }
  }
  return interviewers;
}

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
}