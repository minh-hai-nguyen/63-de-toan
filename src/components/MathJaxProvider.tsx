"use client";

import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/ams", "[tex]/color"] },
  tex: {
    packages: { "[+]": ["ams", "color"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  options: {
    enableMenu: false,
  },
};

export default function MathJaxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MathJaxContext version={3} config={config}>
      {children}
    </MathJaxContext>
  );
}
