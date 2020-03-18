import React, { useState } from "react";
import "./styles.scss";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => { e.preventDefault();}}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setName(e.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
          onChange={e => setInterviewer(e.target.value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button
            onClick={() => {
              setInterviewer(interviewer => {
                console.log(interviewer)
                return interviewer;
              });
            }}
            confirm
          >Save</Button>
        </section>
      </section>
    </main>
  );
}