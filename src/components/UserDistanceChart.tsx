import React, { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  PriceScaleMode,
} from "lightweight-charts";
import PropTypes from "prop-types";
import { trpc } from "../utils/trpc";
import useResizeObserver from "use-resize-observer";

function DailyDistanceChart(props: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  let chart = useRef<IChartApi>();
  const {
    data: pByDate,
    isLoading: pByDateLoading,
    refetch: refetchPByDate,
  } = trpc.useQuery(["participations.kmByDate"]);

  const { height = 200, width = 300 } = useResizeObserver({
    ref: ref.current,
    onResize: () => {
      console.log("resize");
      chart.current ? chart.current?.resize(width, height) : null;
    },
  });
  useEffect(() => {
    chart.current = createChart(ref.current!, {
      width,
      height,
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: {
          visible: true,
        },
      },
      timeScale: {
        fixLeftEdge: true,
      },
      rightPriceScale: {
        scaleMargins: {
          bottom: 0.05,
          top: 0.92,
        },
      },
      layout: {
        textColor: "#fff",
        background: { color: "#393838" },
        fontFamily: "Rubik",
      },
      handleScroll: false,
      handleScale: false,
      kineticScroll: { touch: false, mouse: false },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
    });
    const areaSeries = chart.current.addAreaSeries({
      topColor: "#6D95AF",
      bottomColor: "rgba(109,149,175,0.3)",
      lineColor: "#6D95AF",
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.5,
      },
    });
    pByDate
      ? areaSeries.setData(
          pByDate
            .sort((a: any, b: any) => b.date - a.date)
            .map((p: any) => {
              return {
                time: p.date.toISOString().split("T")[0],
                value: p._sum.distance,
              };
            })
        )
      : "";
    chart.current.timeScale().fitContent();
    return () => {
      chart.current ? chart.current.remove() : null;
    };
  }, []);

  return (
    <>
      <div className={"bg-dark w-max py-6 px-4 rounded-xl"}>
        <div className={"ml-4 mt-2 font-poppins text-3xl text-white "}>
          {"Distance par jour"}
        </div>
        <div className={""} ref={ref} />
      </div>
    </>
  );
}

export default DailyDistanceChart;
