import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const MainArea = ({ dropPosition, w, h }) => {
  const svgRef = useRef()
  const [rectData, setRectData] = useState([])

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('background-color', '#f0f0f0')

    const data = [
      { x: 100, y: 100, r: 30 },
      { x: 200, y: 200, r: 20 },
    ]

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', 'steelblue')
  }, [])

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const rects = svg.selectAll('rect').data(rectData, d => d.id) // Use a unique identifier for each rectangle
    rects
      .enter()
      .append('rect')
      .attr('fill', 'steelblue')
      .attr('width', 50)
      .attr('height', 30)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .call(
        d3.drag().on('drag', (event, d) => {
          d3.select(event.target)
            .attr('x', (d.x = event.x))
            .attr('y', (d.y = event.y))
        })
      )

    rects.attr('x', d => d.x).attr('y', d => d.y)

    rects.exit().remove()
  }, [rectData])

  // single rect
  // useEffect(() => {
  // const svg = d3.select(svgRef.current)
  //   if (rectData) {
  //     const drag = d3.drag().on('drag', event => {
  //       setRectData(prevData => ({
  //         ...prevData,
  //         x: event.x,
  //         y: event.y,
  //       }))
  //     })
  //     svg
  //       .selectAll('rect')
  //       .data([rectData])
  //       .join('rect')
  //       .attr('x', d => d.x)
  //       .attr('y', d => d.y)
  //       .attr('width', d => d.width)
  //       .attr('height', d => d.height)
  //       .attr('fill', 'steelblue')
  //       .call(drag)
  //   }
  // }, [rectData])

  useEffect(() => {
    if (dropPosition) {
      setRectData(prev => [
        ...prev,
        { id: Date.now(), x: dropPosition.x, y: dropPosition.y }, // Add a new rectangle with a unique ID
      ])
    }
  }, [dropPosition])

  const handleMouseDown = e => {
    console.log(e.target)
  }

  return <svg ref={svgRef} onMouseDown={handleMouseDown}></svg>
}

export default MainArea
