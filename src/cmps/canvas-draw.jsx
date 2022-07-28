import React, { useEffect, useRef, useState, } from "react";
import { eventBusService } from "../services/event-bus.service";
import { socketService } from "../services/socket.service";
export function CanvasDraw(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
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
    socketService.emit('start-drawing', { offsetX, offsetY })
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    socketService.emit('draw', { offsetX, offsetY })

  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    isDrawing = false
    socketService.emit('finish-drawing')

  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "#FFF"
    context.fillRect(0, 0, canvas.width, canvas.height)
    socketService.emit('clear-canvas')
  }

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      ref={canvasRef}
    />
  );
}

