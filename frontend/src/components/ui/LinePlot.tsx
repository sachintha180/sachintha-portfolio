import { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { Point } from "../../types/Model";

type LinePlotProps = {
  data: Point[][];
  colors: string[];
  width: number;
  height: number;
  legend?: string[];
  label: {
    x: string;
    y: string;
  };
  margin?: {
    left: number;
    bottom: number;
  };
  padding?: number;
  bounds?: {
    x?: [number, number];
    y?: [number, number];
  };
};

export default function LinePlot({
  data,
  colors,
  width,
  height,
  legend,
  label,
  margin = {
    left: 35,
    bottom: 35,
  },
  padding = 1,
  bounds,
}: LinePlotProps) {
  // Initialize reference to the SVG element
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const lines: Point[][] = data;

    // Clear previous plot if data is empty or ref is not available
    if (!ref.current || lines.length === 0 || lines[0].length === 0) {
      if (ref.current) d3.select(ref.current).selectAll("*").remove();
      return;
    }

    // Flatten all points for scale calculation
    const allPoints = lines.flat();

    // Clear svg on rerender
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Scales: left/bottom margin only
    const xExtent =
      bounds && bounds.x ? bounds.x : d3.extent(allPoints, (d) => d.x);
    const xScale = d3
      .scaleLinear()
      .domain([
        (xExtent[0] as number) - padding,
        (xExtent[1] as number) + padding,
      ])
      .range([margin.left, width - 10]);

    const yExtent =
      bounds && bounds.y ? bounds.y : d3.extent(allPoints, (d) => d.y);
    const yScale = d3
      .scaleLinear()
      .domain([
        (yExtent[0] as number) - padding,
        (yExtent[1] as number) + padding,
      ])
      .range([height - margin.bottom, 10]);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Line generator
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    // Plot each line with a distinct color
    lines.forEach((lineData, i) => {
      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add points for each line
      svg
        .append("g")
        .selectAll("circle")
        .data(lineData)
        .join("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 2)
        .attr(
          "fill",
          d3.color(colors[i])?.copy({ opacity: 0.47 })?.formatHex() ||
            colors[i],
        );
    });

    if (legend) {
      const legendGroup = svg
        .append("g")
        .attr("transform", `translate(10, 10)`);

      legend.forEach((label, i) => {
        const yOffset = i * 20;

        // Colored dot
        legendGroup
          .append("circle")
          .attr("cx", 0)
          .attr("cy", yOffset)
          .attr("r", 5)
          .attr("fill", colors[i]);

        // Text label
        legendGroup
          .append("text")
          .attr("x", 10)
          .attr("y", yOffset + 4)
          .text(label)
          .attr("font-size", "10pt")
          .attr("fill", "#444");
      });
    }

    // X axis label
    svg
      .append("text")
      .attr("x", (width + margin.left) / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text(label.x);

    // Y axis label
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", (height - margin.bottom) / 2)
      .attr("text-anchor", "start")
      .append("tspan")
      .text(label.y);
  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height} className="font-math" />;
}
