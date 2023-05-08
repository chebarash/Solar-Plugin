import React from "react";

const d = [];
for (let i = 0; i < 100; i++) d.push(i);

const Loader = () => (
  <div className="skeleton" id="skeleton">
    {d.map((k) => (
      <div key={k}></div>
    ))}
  </div>
);

export default Loader;
