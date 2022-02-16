import { useEffect, useRef, useState } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";

import styles from "../styles/TopFigure.module.css";
import Drawing from "../public/receive-stow-pick.svg";

export default function AnimatedFigure1() {
  const svgEl = useRef<SVGSVGElement>(null);
  const [time, setTime] = useState(0);
  const animationRequest = useRef(0);

  useEffect(() => {
    const svg = SVG(svgEl.current) as Svg;
    // svg.rect(50, 50).move(10, 40).radius(5).fill('#f06');
    const chip = svg.findOne("g.receive-stow-pick_svg__chip") as Svg;
    const original_position = [chip.x() as number, chip.y() as number];
    console.log(original_position);

    // line.animate(3000).plot([[60, 60], [100, 150]])
    const start = Date.now();

    animationRequest.current = requestAnimationFrame(function render() {
      const interval = Date.now() - start;
      // setTime(interval);

      chip.move(
        original_position[0],
        original_position[1] - (interval / 3000) * 100
      );

      setTime(1);

      if (interval < 3000)
        animationRequest.current = requestAnimationFrame(render);
    });
    return () => cancelAnimationFrame(animationRequest.current);
  }, [svgEl]);

  return (
    <div className={styles.figureGrid}>
      <div className={styles.figureTitles}>
        <h2>Receive</h2>
        <h2>Stow</h2>
        <h2>Pick</h2>
      </div>
      <Drawing className={styles.figureImage} ref={svgEl} />
    </div>
  );
}
