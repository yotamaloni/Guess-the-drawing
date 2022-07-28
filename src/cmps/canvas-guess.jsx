import React, { useEffect, useRef, useState, } from "react";
import { eventBusService } from "../services/event-bus.service";
import { socketService } from "../services/socket.service";
export function CanvasGuess(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  var isDrawing = false

  useEffect(() => {
    setCanvas()
    socketService.on('start-drawing', (pos) => { startDrawing(pos) })
    socketService.on('draw', (pos) => { draw(pos) })
    socketService.on('finish-drawing', finishDrawing)
    socketService.on('clear-canvas', clearCanvas)
    return () => {
      socketService.off('start-drawing')
      socketService.off('draw')
      socketService.off('finish-drawing')
      socketService.off('clear-canvas')
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

  const startDrawing = (pos) => {
    contextRef.current.beginPath();
    const { offsetX, offsetY } = getAbsolutePos(pos)
    contextRef.current.moveTo(offsetX, offsetY);
    isDrawing = true
  }

  const draw = (pos) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = getAbsolutePos(pos)
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

  const getAbsolutePos = (pos) => {
    const canvas = canvasRef.current
    const offsetX = pos.x * canvas.offsetWidth
    const offsetY = pos.y * canvas.offsetHeight
    return {
      offsetX, offsetY
    }
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