import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Draggable from "react-draggable";
import ArrayStorage from "../lib/storage";

type PositionType = { x: number; y: number };
type RoomType = { name: string; start: PositionType; end: PositionType };

const img = new Image();
const INITIAL_POSITION: PositionType = { x: 0, y: 0 };
// const INITIAL_ROOM: RoomType = { name: "", start: INITIAL_POSITION, end: INITIAL_POSITION };
// const MIN_SCALE = 0.1;
// const MAX_SCALE = 10;

const DrawRectDragCanvas = () => {
  const [showModal, setShowModal] = useState(false);

  const rectCanvasRef = useRef<HTMLCanvasElement>(null);
  const scaleRef = useRef(1);
  const panningRef = useRef(false);
  const viewPosRef = useRef(INITIAL_POSITION);
  const startPosRef = useRef(INITIAL_POSITION);
  const endPosRef = useRef(INITIAL_POSITION);

  // const [roomArray, setRoomArray] = useState<RoomType[]>([]);
  const [startPos, setStartPos] = useState(INITIAL_POSITION);
  const [roomName, setRoomName] = useState("");

  const setTransform = () => {
    const rectCanvas: HTMLCanvasElement = rectCanvasRef.current!;
    const context: CanvasRenderingContext2D = rectCanvas.getContext("2d")!;
    context.setTransform(scaleRef.current, 0, 0, scaleRef.current, viewPosRef.current.x, viewPosRef.current.y);
  };

  const draw = () => {
    const rectCanvas: HTMLCanvasElement = rectCanvasRef.current!;
    const context: CanvasRenderingContext2D = rectCanvas.getContext("2d")!;
    setTransform();
    context.clearRect(0, 0, rectCanvas.width, rectCanvas.height);
    context.drawImage(img, 0, 0, rectCanvas.width, rectCanvas.height);
    // context.strokeStyle = "#ff0000";
    // context.lineWidth = 3;
    // const storeRoomArray = ArrayStorage.getItems<RoomType>("roomArray");

    // storeRoomArray.forEach((room) => {
    //   const rectStartX = room.start.x;
    //   const rectStartY = room.start.y;
    //   const rectWidthX = room.end.x - room.start.x;
    //   const rectWidthY = room.end.y - room.start.y;

    //   context.strokeRect(rectStartX, rectStartY, rectWidthX, rectWidthY);
    // });
  };

  const drawRect = () => {
    const rectCanvas: HTMLCanvasElement = rectCanvasRef.current!;
    const context: CanvasRenderingContext2D = rectCanvas.getContext("2d")!;
    // context.clearRect(0, 0, rectCanvas.width, rectCanvas.height);
    // context.drawImage(img, 0, 0, rectCanvas.width, rectCanvas.height);
    context.strokeStyle = "#ff0000";
    context.lineWidth = 3;
    const rectStartX = startPosRef.current.x;
    const rectStartY = startPosRef.current.y;

    const rectWidthX = endPosRef.current.x - startPosRef.current.x;
    const rectWidthY = endPosRef.current.y - startPosRef.current.y;

    context.strokeRect(rectStartX, rectStartY, rectWidthX, rectWidthY);
  };

  useEffect(() => {
    img.src = "/1floor.jpg";
    // Load image
    img.onload = function () {
      draw();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    if (!panningRef.current) {
      return;
    }
    endPosRef.current = {
      x: offsetX,
      y: offsetY,
    };
    draw();
    drawRect();
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    endPosRef.current = {
      x: offsetX,
      y: offsetY,
    };
    console.log(endPosRef.current);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    startPosRef.current = {
      x: offsetX,
      y: offsetY,
    };
    panningRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const xDifference = Math.abs(startPosRef.current.x - endPosRef.current.x);
    const yDifference = Math.abs(startPosRef.current.y - endPosRef.current.y);
    console.log(startPosRef.current);
    console.log(endPosRef.current);
    panningRef.current = false;
    if (xDifference >= 20 && yDifference >= 20 && endPosRef.current.x !== 0 && endPosRef.current.y !== 0) {
      setShowModal(true);
    }
    // drawStoreRect();
    // startPosRef.current = INITIAL_POSITION;
    // endPosRef.current = INITIAL_POSITION;
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data: any) => {
    setPosition({ x: data.x, y: data.y });
  };
  const [Opacity, setOpacity] = useState(false);

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  const canvasDivRef = useRef<HTMLDivElement>(null);
  const rectDraggableRef = useRef<HTMLDivElement>(null);

  const [offsetWH, setOffsetWH] = useState<{ width: number; height: number }>();

  useEffect(() => {
    setOffsetWH({ width: canvasDivRef.current?.offsetHeight!, height: canvasDivRef.current?.offsetWidth! });
    if (rectDraggableRef.current) {
      rectDraggableRef.current.style.width = canvasDivRef.current?.offsetWidth.toString()! + "px";
      rectDraggableRef.current.style.height = canvasDivRef.current?.offsetHeight.toString()! + "px";
      // console.log(canvasDivRef.current?.offsetWidth.toString() + "px", canvasDivRef.current?.offsetHeight.toString() + "px");
    }
  }, [canvasDivRef.current]);

  return (
    <>
      <h1>{JSON.stringify(offsetWH?.width)}</h1>
      <h1>{JSON.stringify(offsetWH?.height)}</h1>
      <div className="flex justify-end gap-6 pb-4">
        {/* <Button
          onClick={() => {
            if (canvasDivRef.current && rectDraggableRef.current) {
              canvasDivRef.current.style.zIndex = "20";
              rectDraggableRef.current.style.zIndex = "10";
            }
            // setDragMode("make");
          }}
        >
          공간 만들기 모드
        </Button> */}
        <Button
          onClick={() => {
            // if (canvasDivRef.current && rectDraggableRef.current) {
            //   canvasDivRef.current.style.zIndex = "10";
            //   rectDraggableRef.current.style.zIndex = "20";
            // }
            // setDragMode("move");
          }}
        >
          디바이스 추가
        </Button>
      </div>

      <div className="p-2 relative">
        <div ref={canvasDivRef} className="border-red-600 border-2 absolute top-0 left-0 z-20">
          <canvas
            ref={rectCanvasRef}
            width="1200"
            height="700"
            style={{ border: "1px solid" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
          />
        </div>

        <div ref={rectDraggableRef} className="border-black border-2 absolute top-0 left-0 z-10">
          <Draggable onDrag={(e, data) => trackPos(data)} onStart={handleStart} onStop={handleEnd} bounds="parent">
            <div className="border-2 border-black w-24 h-24 p-1 text-xs" style={{ opacity: Opacity ? "0.6" : "1" }}>
              <div>BOX</div>
              <div>
                x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
              </div>
            </div>
          </Draggable>
        </div>

        {/* <div className="border-black border-2 h-64 absolute top-0 left-0">
          <Draggable onDrag={(e, data) => trackPos(data)} onStart={handleStart} onStop={handleEnd} bounds="parent">
            <div className="border-2 border-black w-24 h-24 p-1 text-xs" style={{ opacity: Opacity ? "0.6" : "1" }}>
              <div>BOX</div>
              <div>
                x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
              </div>
            </div>
          </Draggable>
        </div> */}
      </div>

      <Dialog
        open={showModal}
        onOpenChange={(e) => {
          setShowModal(e);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공간 이름을 입력해주세요.</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="ex) Room1"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              ></Input>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowModal(false);
                const newRoom: RoomType = { name: roomName, start: startPosRef.current, end: endPosRef.current };
                console.log(startPosRef.current, endPosRef.current);
                // setRoomArray([...roomArray, newRoom]);
                ArrayStorage.pushItems("roomArray", newRoom);
              }}
            >
              확인
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
                draw();
              }}
            >
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DrawRectDragCanvas;
