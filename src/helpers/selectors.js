// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export default function getAppointmentsForDay(state, day) {
  let filteredDays = state.days.filter(thisDay => thisDay.name === day);
  // console.log(filteredDays)
  if (filteredDays === [] || !day || filteredDays[0] === undefined) {
    return []
  }

  const { appointments } = filteredDays[0]
  // console.log(appointments)

  // const answer = state.appointments.filter(thisDay => thisDay.name === day);

  const answer = []
  // console.log(Object.values(state.appointments))
  for (let appointment of Object.values(state.appointments)) {
    // console.log(appointment)

    if (appointments.includes(appointment.id)) {
      answer.push(appointment)
    }
  }

  // console.log(answer)

  return answer;
}
