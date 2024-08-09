import React from 'react'

const Sidebar = ({ onDragStart }) => {
  return (
    <div className="size-full flex flex-col gap-4 justify-center items-center bg-gray-300">
      <div
        draggable
        onDragStart={event => onDragStart(event, 'rectangle')}
        /* onDragStart={onDragStart} */
        style={{
          width: '50px',
          height: '30px',
          backgroundColor: 'steelblue',
        }}
      ></div>
      <div
        className="draggable"
        draggable
        onDragStart={event => onDragStart(event, 'circle')}
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'steelblue',
          borderRadius: '50%',
        }}
      ></div>
    </div>
  )
}

export default Sidebar
