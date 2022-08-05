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

  const startDrawing = (ev) => {
    const { posX, posY } = getPositionFromEv(ev)
    contextRef.current.beginPath();
    contextRef.current.moveTo(posX, posY);
    isDrawing = true
    const pos = getRelativePos(posX, posY)
    socketService.emit('start-drawing', pos)
  }

  const draw = (ev) => {
    ev.stopPropagation()
    if (!isDrawing) {
      return;
    }
    const { posX, posY } = getPositionFromEv(ev)
    contextRef.current.lineTo(posX, posY);
    contextRef.current.stroke();
    const pos = getRelativePos(posX, posY)
    socketService.emit('draw', pos)
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


  const getPositionFromEv = (ev) => {
    var posX, posY
    if (ev.type === "touchmove" || ev.type == "touchstart") {
      const { clientX, clientY } = ev.touches[0];
      posX = clientX - 20
      posY = clientY - 120
    } else {
      const { offsetX, offsetY } = ev.nativeEvent;
      posX = offsetX
      posY = offsetY
    }
    return { posX, posY }
  }

  const getRelativePos = (offsetX, offsetY) => {
    const canvas = canvasRef.current
    const x = offsetX / canvas.offsetWidth
    const y = offsetY / canvas.offsetHeight
    return {
      x, y
    }
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