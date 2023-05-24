import { useEffect, useState, useRef } from "react";

function Beep(props) {
    const audioBeep = useRef();
    
    useEffect(() => {
        switch (props.status) {
          case true:
            audioBeep.current.play();
            break;
          case false:
            audioBeep.current.pause();
            // audioBeep.current.load();
            audioBeep.current.currentTime = 0;
            // audioBeep.current.load()
            break;
          default:
            break;
        }
    }, [props.status])

    
    return (
        <audio id={props.id} ref={audioBeep}
        onEnded={() => props.setter(false)}
        >
            {props.children}
        </audio>
    )
}

export default Beep;