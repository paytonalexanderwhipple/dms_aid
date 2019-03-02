import React from "react";

export default function WeaponsContainer({ children, columns = 2, gap = 20 }) {
  const columnWrapper = {};
  const result = [];
  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }
  for (let i = 0; i < children.length; i++) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${gap}px` }} key={i}>
        {children[i]}
      </div>
    );
  }
  for (let i = 0; i < columns; i++) {
    result.push(
      <div style={{ marginLeft: `${i > 0 ? gap : 0}px`, flex: 1 }}>
        {columnWrapper[`column${i}`]}
      </div>
    );
  }
  return <div className="WeaponsContainer">{result}</div>;
}
