import React from "react";
import css from "./styles.module.css";

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
    };
  }

  handleFilterChange = () => {
    this.setState((prevState) => ({
      showFilter: !prevState.showFilter,
    }));
  };

  render() {
    const { showFilter } = this.state;
    return (
      <div>
        <div className={css.filterList}>
          <legend>единицы измерения:</legend>
          <input type="checkbox" onChange={this.handleFilterChange} />
        </div>
        {showFilter && (
          <div>
            <Filter
              onSelect={this.props.onSelect}
              selectedUnit={this.props.selectedUnit}
            />
          </div>
        )}
      </div>
    );
  }
}

function Filter(props) {
  const units = ["metric", "standart", "imperial"];
  return (
    <select onChange={props.onSelect}>
      {units.map((item) => (
        <option value={item} selected={props.selectedUnit === item}>
          {item}
        </option>
      ))}
    </select>
  );
}
