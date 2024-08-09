import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const Diagram = ({ dropPosition, w, h }) => {
  const svgRef = useRef(null)
  const [shapes, setShapes] = useState([])

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('background-color', '#f0f0f0')

    const updateShapes = selection => {
      let startX, startY
      selection
        .attr('stroke', d => (d.focused ? 'orange' : 'none'))
        .attr('stroke-width', 3)
        // on click here would be disturbed by drag event
        // the same failure happens with onmouseup
        // so implement it in drag-end handler
        // .on('click', (event, d) => {
        //   // event.stopPropagation() // Prevent triggering the SVG click event
        //   console.log('node id:', d.id)
        //   setShapes(prev =>
        //     prev.map(shape =>
        //       shape.id === d.id ? { ...shape, focused: !shape.focused } : shape
        //     )
        //   )
        // })
        .call(
          d3
            .drag()
            // To enable dragging of rectangles that have already been dropped
            .on('start', event => {
              d3.select(event.sourceEvent.target).raise() // Bring the dragged shape to the front
              startX = event.x
              startY = event.y
            })
            .on('drag', (event, d) => {
              d.x = event.x
              d.y = event.y
              d3.select(event.sourceEvent.target)
                .attr('x', d => (d.type === 'rectangle' ? d.x : null))
                .attr('y', d => (d.type === 'rectangle' ? d.y : null))
                .attr('cx', d => (d.type === 'circle' ? d.x : null))
                .attr('cy', d => (d.type === 'circle' ? d.y : null))
            })
            .on('end', function (event, d) {
              // Compare start and end positions to determine if dragging occurred
              if (startX === event.x || startY === event.y) {
                // console.log('No dragging, just a click', d.id)
                setShapes(prev =>
                  prev.map(shape =>
                    shape.id === d.id
                      ? { ...shape, focused: !shape.focused }
                      : shape
                  )
                )
              }
            })
        )
    }

    // Update rectangles
    const rects = svg.selectAll('rect').data(
      shapes.filter(d => d.type === 'rectangle'),
      d => d.id
    )

    rects
      .enter()
      .append('rect')
      .attr('fill', 'steelblue')
      .attr('width', 50)
      .attr('height', 30)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .call(updateShapes)

    rects
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('stroke', d => (d.focused ? 'orange' : 'none'))

    rects.exit().remove()

    // Update circles
    const circles = svg.selectAll('circle').data(
      shapes.filter(d => d.type === 'circle'),
      d => d.id
    )

    circles
      .enter()
      .append('circle')
      .attr('fill', 'steelblue')
      .attr('r', 15)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .call(updateShapes)

    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('stroke', d => (d.focused ? 'orange' : 'none'))
    circles.exit().remove()
  }, [shapes])

  useEffect(() => {
    if (dropPosition) {
      setShapes(prev => [
        ...prev,
        {
          id: Date.now(),
          type: dropPosition.type,
          x: dropPosition.x,
          y: dropPosition.y,
          focused: false,
        },
      ])
    }
  }, [dropPosition])
  return (
    <svg
      ref={svgRef}
      className="size-full border border-slate-800 relative"
    ></svg>
  )
  // return (
  //   <div style={{ width: '100%', height: '100%', position: 'relative' }}>
  //     <svg ref={svgRef}></svg>
  //   </div>
  // )
}

export default Diagram

// import React, { useEffect, useRef, useState } from 'react'
// import * as d3 from 'd3'

// const MainArea = ({ dropPosition, w, h }) => {
//   const svgRef = useRef()
//   const [rectData, setRectData] = useState([])

//   useEffect(() => {
//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', '100%')
//       .attr('height', '100%')
//       .attr('viewBox', `0 0 ${w} ${h}`)
//       .attr('preserveAspectRatio', 'xMidYMid meet')
//       .style('background-color', '#f0f0f0')

//     const data = [
//       { x: 100, y: 100, r: 30 },
//       { x: 200, y: 200, r: 20 },
//     ]

//     svg
//       .selectAll('circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('cx', d => d.x)
//       .attr('cy', d => d.y)
//       .attr('r', d => d.r)
//       .attr('fill', 'steelblue')
//   }, [])

//   useEffect(() => {
//     const svg = d3.select(svgRef.current)
//     const rects = svg.selectAll('rect').data(rectData, d => d.id) // Use a unique identifier for each rectangle
//     rects
//       .enter()
//       .append('rect')
//       .attr('fill', 'steelblue')
//       .attr('width', 50)
//       .attr('height', 30)
//       .attr('x', d => d.x)
//       .attr('y', d => d.y)
//       .attr('stroke', d => (d.focused ? 'orange' : 'none')) // Set border based on focus
//       .attr('stroke-width', 3)
//       .on('click', (event, d) => {
//         event.stopPropagation() // Prevent triggering the SVG click event
//         setRectData(prev =>
//           prev.map(rect =>
//             rect.id === d.id ? { ...rect, focused: !rect.focused } : rect
//           )
//         )
//       })
//       .call(
//         d3
//           .drag()
//           .on('start', event => {
//             // To enable dragging of rectangles that have already been dropped
//             d3.select(event.sourceEvent.target).raise() // Bring the dragged rect to the front
//           })
//           .on('drag', (event, d) => {
//             d.x = event.x // Update the rectangle's x position
//             d.y = event.y // Update the rectangle's y position
//             d3.select(event.sourceEvent.target).attr('x', d.x).attr('y', d.y)
//           })
//       )
//     // .call(
//     //   d3.drag().on('drag', (event, d) => {
//     //     d3.select(event.target)
//     //       .attr('x', (d.x = event.x))
//     //       .attr('y', (d.y = event.y))
//     //   })
//     // )

//     rects
//       .attr('x', d => d.x)
//       .attr('y', d => d.y)
//       .attr('stroke', d => (d.focused ? 'orange' : 'none'))

//     rects.exit().remove()
//   }, [rectData])

//   // single rect
//   // useEffect(() => {
//   // const svg = d3.select(svgRef.current)
//   //   if (rectData) {
//   //     const drag = d3.drag().on('drag', event => {
//   //       setRectData(prevData => ({
//   //         ...prevData,
//   //         x: event.x,
//   //         y: event.y,
//   //       }))
//   //     })
//   //     svg
//   //       .selectAll('rect')
//   //       .data([rectData])
//   //       .join('rect')
//   //       .attr('x', d => d.x)
//   //       .attr('y', d => d.y)
//   //       .attr('width', d => d.width)
//   //       .attr('height', d => d.height)
//   //       .attr('fill', 'steelblue')
//   //       .call(drag)
//   //   }
//   // }, [rectData])

//   useEffect(() => {
//     if (dropPosition) {
//       setRectData(prev => [
//         ...prev,
//         { id: Date.now(), x: dropPosition.x, y: dropPosition.y }, // Add a new rectangle with a unique ID
//       ])
//     }
//   }, [dropPosition])

//   return <svg ref={svgRef}></svg>
// }

// export default MainArea
