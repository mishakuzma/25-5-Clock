import Button from "./button";

function Selector(props) {
  return (
    <div className="selector-parent">
      {props.children}
      <div className="selector">
        <Button
          buttonType={props.lengthType + "-increment"}
          action={props.lengthHandler}
          payload={[props.setterFn, props.length + 1]}
        >
          ⬆
        </Button>
        <p id={props.lengthType + "-length"}>{props.length}</p>
        <Button
          buttonType={props.lengthType + "-decrement"}
          action={props.lengthHandler}
          payload={[props.setterFn, props.length - 1]}
        >
          ⬇
        </Button>
      </div>
    </div>
  );
}

export default Selector;
