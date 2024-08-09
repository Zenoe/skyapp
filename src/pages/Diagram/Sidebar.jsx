import React from 'react'

const Sidebar = ({ onDragStart }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
      }}
    >
      <div
        draggable
        onDragStart={onDragStart}
        style={{
          width: '50px',
          height: '30px',
          backgroundColor: 'steelblue',
        }}
      ></div>
    </div>
  )
}

export default Sidebar
