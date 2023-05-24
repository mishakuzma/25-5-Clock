import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Timer from "./features/timer";
import Button from "./features/button";
import Selector from "./features/selector";
import Beep from "./features/Beep"

function App() {
  // Milliseconds per second
  const milSec = 1000;
  // Milliseconds per minute
  const milMin = 60000;
  // Milliseconds per hour
  const milHour = 3600000;

  // const dateObj = new Date(25 * milMin);
  const [chill, setChill] = useState(5);
  const [session, setSession] = useState(25);
  const [firstRun, setFirstRun] = useState(false);
  const [timer, setTimer] = useState(session * 60);
  const [type, setType] = useState("session");
  const [beep, setBeep] = useState(false)
  const [running, setRunning] = useState({
    status: false,
    lastActive: Date.now(),
  });

  // change timer when its time for a break or session
  const changeTimer = (inTimer) => {
    if (inTimer == 0) {
      switch (type) {
        case "session":
          setType("break");
          setTimer(chill * milMin);
          break;
        case "break":
          setType("session");
          setTimer(session * milMin);
          break;
        default:
          break;
      }
    }
  };

  const onInterval = (
    timer,
    setTimer,
    running,
    setRunning,
    type,
    setType,
    chill,
    session,
    setBeep
  ) => {
    // is beep supposed to be playing?

    // check if we are supposed to be running right now
    if (running.status) {
      //     console.log("running is on");
      //     console.log("timer: " + timer);
      //     console.log("date now: " + Date.now());
      //     console.log("running: " + running.lastActive);
      
      //given that we're supposed to be running,
      // is time about to hit 0?
      if (!timer) {
        // time has hit zero, we have something to do.

        // play the beep
        setBeep(true);

        // what are we changing our timer type to?
        switch (type) {
          case "session":
            // it's break time now, lets set up
            setType("break");
            setTimer(chill * 60);
            return;
            break;
          case "break":
            // it's work time, lets set up
            setType("session");
            setTimer(session * 60);
            return;
            break;
          default:
            break;
        }
      }

      // Time isnt hitting zero, so just run normal
      setTimer(timer - 1);
    }
  };

  useEffect(() => {
    // if (!timer) return;
    const interval = setInterval(() => {
      onInterval(
        timer,
        setTimer,
        running,
        setRunning,
        type,
        setType,
        chill,
        session,
        setBeep
      );
      // setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, running.status, beep]);

  //
  //     //   if (Date.now() >= running.lastActive) {
  //     //     // running.lastActive + milSec < Date.now()
  //     //     // console.log("about toIncrementint timer");

  //     //     var timeout = setInterval(() => {
  //     //       console.log("incremening timer now");
  //     //       // Mutating state is bad practice, but replacing running
  //     //       //  state with an inmutable copy doesn't make any sense in this
  //     //       //  case because running.status controls if the timer is on.
  //     //       // That copy would have running.status = true, which will
  //     //       //  overwrite any user input trying to pause the timer.
  //     //       running.lastActive = Date.now();
  //     //       // setRunning({ status: running.status, lastActive: Date.now() });
  //     //       setTimer(timer - milSec);
  //     //     }, milSec);
  //     //   }
  //     // } else if (!running.status) {
  //     //   clearInterval(timeout);
  //     // }
  //   }
  // });

  const handleLength = ([setter, change]) => {
    if (change < 61 && change > 0 && !firstRun) {
      setter(change);
    }
  };

  const handleRunning = () => {
    // if (!running.status) {
    // var myTimer = 1000;
    // var myTimer = setInterval(setTimer(timer - milSec), milSec);
    // } else {
    // clearInterval(myTimer);
    // }
    if (!firstRun) {
      setTimer(session * 60);
      setFirstRun(true);
    }

    if (running.status) {
      // timer is on, lets turn it off
      setRunning({
        status: !running.status,
        lastActive: Date.now(),
      });
    } else if (!running.status) {
      // timer is off, lets turn it on
      setRunning({
        status: !running.status,
        lastActive: Date.now(),
      });
    }
  };

  function onReset([setTimer, setChill, setSession]) {
    // dateObj.setTime(25 * milMin);
    setFirstRun(false);
    setBeep(false);
    setRunning({ status: false, lastActive: Date.now() });
    setTimer(25 * 60);
    setChill(5);
    setSession(25);
    setType("session");
  }

  // make time look pretty
  const formatTime = (timer) => {
    const re = /:(\d\d:\d\d)/;
    if (timer == 3600) {
      return "60:00"
    }
    return new Date(timer * milSec).toTimeString().match(re)[1];
  };

  return (
    <div className="App">
      <h1>25+5 Clock</h1>
      <div className="row">
        <Selector
          lengthType="session"
          length={session}
          lengthHandler={handleLength}
          setterFn={setSession}
          // lock={firstRun}
        >
          <h2 id="session-label">Session Length</h2>
        </Selector>

        <Selector
          lengthType="break"
          length={chill}
          lengthHandler={handleLength}
          setterFn={setChill}
          // lock={firstRun}
        >
          <h2 id="break-label">Break Length</h2>
        </Selector>
      </div>

      <div className="row" id="timerRow">
        <h2 id="timer-label">{type}</h2>
        <Beep id="beep" status={beep} setter={setBeep}>
          <source
            src="src\assets\build_testable-projects-fcc_audio_BeepSound.wav"
            type="audio/wav"
          ></source>
        </Beep>
        <Timer
          id="time-left"
          timer={formatTime(timer)}
          // setTimer={setTimer}
          // active={running.status}
        ></Timer>
      </div>

      <div className="row">
        <Button buttonType="start_stop" action={handleRunning} payload={""}>
          ⏯
        </Button>
        <Button
          buttonType="reset"
          action={onReset}
          payload={[setTimer, setChill, setSession]}
        >
          ♻
        </Button>
      </div>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
}

export default App;
