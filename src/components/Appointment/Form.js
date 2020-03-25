import React, { useState } from "react";
import "./styles.scss";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate() {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }
  if (!interviewer) {
    setError("Please selet an interviewer");
    return;
  }
  setError("")
  props.onSave(name, interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            value={name}
            type="text"
            placeholder={"Enter Student Name"}
            onChange={e => setName(e.target.value)}
            // for test
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
          onChange={e => setInterviewer(e.target.value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button 
          confirm
          onClick={validate}
          >Save</Button>
        </section>
      </section>
    </main>
  );
}