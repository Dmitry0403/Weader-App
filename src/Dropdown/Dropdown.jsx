import React from "react";
import css from "./styles.module.css";

export const Dropdown = (props) => {
  return (
    <div>
      <div className={css.filterList}>
        <legend>единицы измерения температуры:</legend>
      </div>
      <div>
        <Filter onSelect={props.onSelect} selectedUnit={props.selectedUnit} />
      </div>
    </div>
  );
};

function Filter(props) {
  const units = [
    { metric: "Celsius" },
    { standart: "Kelvin" },
    { imperial: "Fahrenheit" },
  ];
  return (
    <select className={css.select} onChange={props.onSelect}>
      {units.map((item) => (
        <option
          key={Object.keys(item)}
          value={Object.keys(item)}
          selected={props.selectedUnit === Object.keys(item)}
        >
          {Object.values(item)}
        </option>
      ))}
    </select>
  );
}
