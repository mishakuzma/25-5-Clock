import { useEffect, useState } from "react";

// Example of intervbal working
// const Timer = ({  }) => {
//   // initialize timeLeft with the seconds prop
//   const [timeLeft, setTimeLeft] = useState(10);

//   useEffect(() => {
//     // exit early when we reach 0
//     if (!timeLeft) return;

//     // save intervalId to clear the interval when the
//     // component re-renders
//     const intervalId = setInterval(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);

//     // clear interval on re-render to avoid memory leaks
//     return () => clearInterval(intervalId);
//     // add timeLeft as a dependency to re-rerun the effect
//     // when we update it
//   }, [timeLeft]);

//   return (
//     <div>
//       <h1>{timeLeft}</h1>
//     </div>
//   );
// };

function Timer(props) {



  // const onInterval = (
  //   timer,
  //   setTimer,
  //   running,
  //   // setRunning,
  //   // type,
  //   // setType,
  //   // chill,
  //   // session
  // ) => {
  //   // check if we are supposed to be running right now
  //   if (running) {
  //     //     console.log("running is on");
  //     //     console.log("timer: " + timer);
  //     //     console.log("date now: " + Date.now());
  //     //     console.log("running: " + running.lastActive);
  //     setTimer(timer - 1);
  //   }
  // };

  // useEffect(() => {
  //   if (!props.timer) return;
  //   const interval = setInterval(
  //     onInterval(
  //       props.timer,
  //       props.setTimer,
  //       props.active,
  //       // setRunning,
  //       // type,
  //       // setType,
  //       // chill,
  //       // session
  //     ),
  //     // () => props.setTimer(props.timer),
  //     1000
  //   );
  
  //   return () => clearInterval(interval);
  // }, );
  return (
    <div className="timer" id={props.id}>
      {props.children}
      {props.timer}
    </div>
  );
}

export default Timer;
