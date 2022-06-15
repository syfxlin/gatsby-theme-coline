import React, { useEffect, useRef } from "react";
import { useU } from "@syfxlin/ustyled";
import { render } from "../utils/canvas";

export const Canvas: React.FC = () => {
  const { css, ctx } = useU();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      render(
        ref.current,
        ref.current.clientWidth,
        ref.current.clientHeight,
        ctx.mode === "light" ? "#000000" : "#ffffff",
        0.25
      );
    }
  }, [ctx.mode]);

  return (
    <canvas
      ref={ref}
      css={css`
        height: 100vh;
        width: 100vw;
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
      `}
    ></canvas>
  );
};
