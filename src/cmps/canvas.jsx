import React, { useEffect, useRef, useState, } from "react";
import { eventBusService } from "../services/event-bus.service";
export function Canvas(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  // const [isDrawing, setIsDrawing] = useState(false)
  var isDrawing = false
  var removeEventEraseDrawing = null

  useEffect(() => {
    setCanvas()
    removeEventEraseDrawing = eventBusService.on('erase-drawing', clearCanvas)
    return () => {
      removeEventEraseDrawing()

    }
  }, [])

  const setCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d")
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    isDrawing = true
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    isDrawing = false

  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "#FFF"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}