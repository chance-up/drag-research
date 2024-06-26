import { useEffect, useRef, useState } from "react";

import Draggable from "react-draggable"; // Both at the same time

const img = new Image();
const INITIAL_POSITION = { x: 0, y: 0 };
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;

function WheelDragZoomCanvas() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);
  const scaleRef = useRef(1);
  const panningRef = useRef(false);
  const viewPosRef = useRef(INITIAL_POSITION);
  const startPosRef = useRef(INITIAL_POSITION);

  const setTransform = () => {
    const zoomCanvas: HTMLCanvasElement = zoomCanvasRef.current!;
    const context: CanvasRenderingContext2D = zoomCanvas.getContext("2d")!;
    context.setTransform(scaleRef.current, 0, 0, scaleRef.current, viewPosRef.current.x, viewPosRef.current.y);
  };

  const draw = () => {
    const zoomCanvas: HTMLCanvasElement = zoomCanvasRef.current!;
    const context: CanvasRenderingContext2D = zoomCanvas.getContext("2d")!;
    zoomCanvas.width = zoomCanvas.width;
    setTransform();
    context.drawImage(img, 0, 0, zoomCanvas.width, zoomCanvas.height);
  };

  useEffect(() => {
    img.src =
      "https://firebasestorage.googleapis.com/v0/b/storege-974dc.appspot.com/o/image%2Frabbit.jpeg?alt=media&token=cc501a63-0258-4aa3-809f-c45b743d2735";
    // Load image
    img.onload = function () {
      draw();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    startPosRef.current = {
      x: offsetX - viewPosRef.current.x,
      y: offsetY - viewPosRef.current.y,
    };
    panningRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    panningRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    if (!panningRef.current) {
      return;
    }

    viewPosRef.current = {
      x: offsetX - startPosRef.current.x,
      y: offsetY - startPosRef.current.y,
    };
    draw();
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();

    const xs = (offsetX - viewPosRef.current.x) / scaleRef.current;
    const ys = (offsetY - viewPosRef.current.y) / scaleRef.current;
    const delta = -e.deltaY;
    const newScale = delta > 0 ? scaleRef.current * 1.2 : scaleRef.current / 1.2;

    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      scaleRef.current = newScale;
      viewPosRef.current = {
        x: offsetX - xs * scaleRef.current,
        y: offsetY - ys * scaleRef.current,
      };
    }
    draw();
  };

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
      <canvas
        ref={zoomCanvasRef}
        width="500"
        height="500"
        style={{ border: " 1px solid" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
    </>
  );
}

export default WheelDragZoomCanvas;
