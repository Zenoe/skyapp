import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import Sidebar from './Sidebar'
import MainArea from './MainArea'

const Diagram = () => {
  const [dropPosition, setDropPosition] = useState(null)

  const handleDragStart = event => {
    // event.dataTransfer.setData('text/plain', '')
    // setDragging(true)
  }
  const handleDrop = event => {
    event.preventDefault()
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log(event.clientX, event.clientY, rect.left, rect.top, x, y)
    setDropPosition({ x, y })
  }

  const handleDragOver = event => {
    event.preventDefault()
  }
  return (
    <div className="flex col size-full">
      <div className="w-56" border>
        <Sidebar onDragStart={handleDragStart} />
      </div>
      <div
        className="w-[1000px] h-[800px] bg-gray-300  "
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <MainArea dropPosition={dropPosition} w="1000" h="800" />
      </div>
    </div>
  )
}

export default Diagram
