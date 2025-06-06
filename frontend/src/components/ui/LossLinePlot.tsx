import { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { LossPoint } from "../../types/Model";

type LossLinePlotProps = {
  data: LossPoint[];
  width: number;
  height: number;
  margin?: {
    left: number;
    bottom: number;
  };
  padding?: number;
};

export default function LossLinePlot({
  data,
  width,
  height,
  margin = {
    left: 35,
    bottom: 35,
  },
  padding = 1,
}: LossLinePlotProps) {
  // Initialize reference to the SVG element
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Clear previous plot if data is empty or ref is not available
    if (!ref.current || data.length === 0) {
      if (ref.current) d3.select(ref.current).selectAll("*").remove();
      return;
    }

    // Clear svg on rerender

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Scales: left/bottom margin only
    const xExtent = d3.extent(data, (d) => d.epoch);
    const xScale = d3
      .scaleLinear()
      .domain([
        (xExtent[0] as number) - padding,
        (xExtent[1] as number) + padding,
      ])
      .range([margin.left, width - 10]);

    const yExtent = d3.extent(data, (d) => d.loss);
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
      .line<LossPoint>()
      .x((d) => xScale(d.epoch))
      .y((d) => yScale(d.loss));

    // Plot the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#FF4136")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add points
    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.epoch))
      .attr("cy", (d) => yScale(d.loss))
      .attr("r", 3)
      .attr("fill", "#FF413677");

    // X axis label
    svg
      .append("text")
      .attr("x", (width + margin.left) / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("Epochs");

    // Y axis label
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", (height - margin.bottom) / 2)
      .attr("text-anchor", "start")
      .append("tspan")
      .text("Loss");
  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height} className="font-math" />;
}
