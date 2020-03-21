import React from "react";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Saving from "./Saving";
import Confirm from "./Confirm";
import Deleting from "./Deleting";
import ErrorDelete from "./ErrorDelete";
import ErrorSaving from "./ErrorSaving";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  // console.log(props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(interview)
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => transition(ERROR_SAVE));
  }

  function deleteItem(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(interview)
    transition(DELETING, true)
    props.deleteInterview(props.id, interview)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Saving />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={deleteItem}
        />
      )}
      {mode === DELETING && (
        <Deleting />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <ErrorSaving
        onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <ErrorDelete
        onClose={() => back()}
        />
      )}
    </article>
  )
}