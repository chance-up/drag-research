import Draggable from "react-draggable"; // Both at the same time
import { useState, useRef } from "react";

// const {ReactDraggable: Draggable, React, ReactDOM} = window;

const DraggableTest = () => {
  const [state, setState] = useState<any>({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  });

  const handleDrag = (e: any, ui: any) => {
    const { x, y } = state.deltaPosition;
    setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  const onStart = () => {
    setState({ activeDrags: ++state.activeDrags });
  };

  const onStop = () => {
    setState({ activeDrags: --state.activeDrags });
  };
  const onDrop = (e: any) => {
    setState({ activeDrags: --state.activeDrags });
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove("hovered");
    }
  };
  const onDropAreaMouseEnter = (e: any) => {
    if (state.activeDrags) {
      e.target.classList.add("hovered");
    }
  };
  const onDropAreaMouseLeave = (e: any) => {
    e.target.classList.remove("hovered");
  };

  // For controlled component
  const adjustXPos = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = state.controlledPosition;
    setState({ controlledPosition: { x: x - 10, y } });
  };

  const adjustYPos = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = state;
    const { x, y } = controlledPosition;
    setState({ controlledPosition: { x, y: y - 10 } });
  };

  const onControlledDrag = (e: any, position: any) => {
    const { x, y } = position;
    setState({ controlledPosition: { x, y } });
  };

  const onControlledDragStop = (e: any, position: any) => {
    onControlledDrag(e, position);
    onStop();
  };
  const dragHandlers = { onStart, onStop: onStop };
  // const { deltaPosition, controlledPosition } = state;

  const nodeRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [position2, setPosition2] = useState({ x: 50, y: 50 });

  const [Opacity, setOpacity] = useState(false);
  const [Opacity2, setOpacity2] = useState(false);

  const trackPos = (data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  const trackPos2 = (data: any) => {
    setPosition2({ x: data.x, y: data.y });
  };

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  const handleStart2 = () => {
    setOpacity2(true);
  };
  const handleEnd2 = () => {
    setOpacity2(false);
  };

  return (
    <div>
      <h1>React Draggable</h1>
      <p>Active DragHandlers: {state.activeDrags}</p>
      <p>
        <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">Demo Source</a>
      </p>
      <div className="box border-black border-2 p-4 h-64 relative">
        <Draggable nodeRef={nodeRef} onDrag={(e, data) => trackPos(data)} onStart={handleStart} onStop={handleEnd} bounds="parent">
          <div ref={nodeRef} className="border-2 border-black w-24 h-24 p-1 text-xs" style={{ opacity: Opacity ? "0.6" : "1" }}>
            <div>BOX</div>
            <div>
              x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
            </div>
          </div>
        </Draggable>
      </div>

      {/* <Draggable onDrag={(e, data) => trackPos(data)}>
        <div className="box">
          <div>BOX</div>
          <div>
            x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
          </div>
        </div>
      </Draggable> */}
      {/* <div className="box border-black border-2">
        <div className="w-36 h-36">
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I can only be moved within my offsetParent.
              <br />
              <br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I also can only be moved within my offsetParent.
              <br />
              <br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
        </div>
      </div> */}
    </div>
  );
};

export default DraggableTest;

// class RemWrapper extends React.Component {
//   // PropTypes is not available in this environment, but here they are.
//   // static propTypes = {
//   //   style: PropTypes.shape({
//   //     transform: PropTypes.string.isRequired
//   //   }),
//   //   children: PropTypes.node.isRequired,
//   //   remBaseline: PropTypes.number,
//   // }

//   translateTransformToRem(transform, remBaseline = 16) {
//     const convertedValues = transform
//       .replace("translate(", "")
//       .replace(")", "")
//       .split(",")
//       .map((px) => px.replace("px", ""))
//       .map((px) => parseInt(px, 10) / remBaseline)
//       .map((x) => `${x}rem`);
//     const [x, y] = convertedValues;

//     return `translate(${x}, ${y})`;
//   }

//   render() {
//     const { children, remBaseline = 16, style } = props;
//     const child = React.Children.only(children);

//     const editedStyle = {
//       ...child.props.style,
//       ...style,
//       transform: translateTransformToRem(style.transform, remBaseline),
//     };

//     return React.cloneElement(child, {
//       ...child.props,
//       ...props,
//       style: editedStyle,
//     });
//   }
// }

// ReactDOM.render(<App />, document.getElementById("container"));
