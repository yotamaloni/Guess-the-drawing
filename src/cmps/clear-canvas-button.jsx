import React from 'react'
import { useCanvas } from './canvas-context'

export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return <button onClick={clearCanvas}>Очистить</button>
}