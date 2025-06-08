import { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { ScatterPoint } from "../../types/Model";

type ScatterPlotProps = {
  data: ScatterPoint[];
  width: number;
  height: number;
  margin?: {
    left: number;
    bottom: number;
  };
  padding?: number;
  boundary?: {
    w1: number;
    w2: number;
    b: number;
  };
};

export default function ScatterPlot({
  data,
  width,
  height,
  margin = {
    left: 35,
    bottom: 35,
  },
  padding = 1,
  boundary,
}: ScatterPlotProps) {
  // Initialize reference to the SVG element
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Clear previous plot if data is empty or ref is not available
    if (!ref.current || data.length === 0) {
      if (ref.current) {
        d3.select(ref.current).selectAll("*").remove();
      }
      return;
    }

    // Clear svg on rerender
    const svgElement = d3.select(ref.current);
    svgElement.selectAll("*").remove();

    // Scales: left/bottom margin only
    const xExtent = d3.extent(data, (d: ScatterPoint) => d.x1);
    const xScale = d3
      .scaleLinear()
      .domain([
        (xExtent[0] as number) - padding,
        (xExtent[1] as number) + padding,
      ])
      .range([margin.left, width - 10]);

    const yExtent = d3.extent(data, (d: ScatterPoint) => d.x2);
    const yScale = d3
      .scaleLinear()
      .domain([
        (yExtent[0] as number) - padding,
        (yExtent[1] as number) + padding,
      ])
      .range([height - margin.bottom, 10]);

    // Axes
    svgElement
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
    svgElement
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Dots
    svgElement
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d: ScatterPoint) => xScale(d.x1))
      .attr("cy", (d: ScatterPoint) => yScale(d.x2))
      .attr("r", 3)
      // The label is optional, will default to red
      .attr("fill", (d: ScatterPoint) =>
        d.label === 1 ? "#0074D9" : "#FF4136",
      )
      .attr("opacity", 0.8);

    // Labels
    svgElement
      .append("text")
      .attr("x", (width + margin.left) / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .append("tspan")
      .text("x")
      .append("tspan")
      .attr("baseline-shift", "sub")
      .attr("font-size", "75%")
      .text("1");

    svgElement
      .append("text")
      .attr("x", 0)
      .attr("y", (height - margin.bottom) / 2)
      .attr("text-anchor", "start")
      .append("tspan")
      .text("x")
      .append("tspan")
      .attr("baseline-shift", "sub")
      .attr("font-size", "75%")
      .text("2");

    // Plot decision boundary
    if (boundary) {
      const xStart = xScale.domain()[0];
      const xEnd = xScale.domain()[1];

      const m = -(boundary.w2 / boundary.w1);
      const c = -boundary.b / boundary.w1;

      const yStart = m * xStart + c;
      const yEnd = m * xEnd + c;

      svgElement
        .append("line")
        .attr("x1", xScale(xStart))
        .attr("y1", yScale(yStart))
        .attr("x2", xScale(xEnd))
        .attr("y2", yScale(yEnd))
        .attr("stroke", "#111")
        .attr("stroke-dasharray", "4 2")
        .attr("stroke-width", 1.5);
    }
  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height} className="font-math" />;
}
