import css from "./styles.module.css";

export function Dropdown(props) {
  const isFilter = props.isFilter;
  return (
    <div>
      <div className={css.filterList}>
        <legend>единицы измерения:</legend>
        <input type="checkbox" onChange={props.onChange} />
      </div>
      {isFilter && (
        <div>
          <Filter onSelect={props.onSelect} selected={props.selected} />
        </div>
      )}
    </div>
  );
}

function Filter(props) {
    return (
      <select onChange={props.onSelect}>
        <option value="metric" selected={props.selected === "metric"}>
          metric
        </option>
        <option value="standard" selected={props.selected === "standard"}>
          standard
        </option>
        <option value="imperial" selected={props.selected === "imperial"}>
          imperial
        </option>
      </select>
    );
  }
