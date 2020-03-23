import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);  
  
  function transition(mode, replace = false) {
    if (!replace) {
      setHistory(() => [...history, mode]);
    }
    setMode(() => mode);
  }

  function back() {
    if (history[history.length - 1] !== initial) {
      history.pop();
      setMode(() => history[history.length - 1]);
    }
  }  
  
  return { mode, transition, back };
}