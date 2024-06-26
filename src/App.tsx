import { useEffect, useRef, useState } from "react";
import "./App.css";
import Draggable from "react-draggable"; // Both at the same time
import WheelDragZoomCanvas from "./components/WheelDragZoomCanvas";
import DrawRectDragCanvas from "./components/DrawRectDragCanvas";
import DraggableTest from "./components/DraggableTest";

function App() {
  return (
    <>
      {/* <div>
        <Draggable onDrag={(e, data) => trackPos(data)}>
          <div className="box">
            <div>BOX</div>
            <div>
              x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
            </div>
          </div>
        </Draggable>
      </div> */}
      {/* <canvas
        ref={zoomCanvasRef}
        width="500"
        height="500"
        style={{ border: " 1px solid" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      /> */}
      {/* <WheelDragZoomCanvas /> */}

      <DrawRectDragCanvas />
      {/* <DraggableTest /> */}
    </>
  );
}

export default App;
