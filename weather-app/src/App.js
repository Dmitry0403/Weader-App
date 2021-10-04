import React from "react";
import css from "./styles.module.css";
import { Loader } from "./Loader";
import { debounce } from "lodash";
import { WeatherInfoTable } from "./WeatherInfoTable/WeatherInfoTable";
import { Dropdown } from "./Dropdown/Dropdown";

export class App extends React.Component {
  state = {
    isLoading: false,
    isError: false,
    isFound: true,
    isFilter: false,
    value: "minsk",
    data: [],
    selected: "metric",
  };

  getData = async () => {
    const AppKey = process.env.REACT_APP_OPEN_WEATHER_TOKEN;
    const value = this.state.value;
    const selected = this.state.selected;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${AppKey}&q=${value}&units=${selected}`;
    this.setState({
      isLoading: true,
    });

    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 400 || 404) {
          this.setState({ isFound: false });
        }
        throw new Error("ошибка");
      })
      .then((data) => {
        this.setState({ data: data.main, isFound: true, isError: false });
      })
      .catch(() => {
        this.setState({ isError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getDataDebounced = debounce(this.getData, 1500);

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(_, prevProps) {
    if (this.state.value !== prevProps.value) {
      this.getDataDebounced();
    } else if (this.state.selected !== prevProps.selected) {
      this.getData();
    } else return;
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleFilterChange = () => {
    const isFilter = this.state.isFilter;
    this.setState({
      isFilter: !isFilter,
    });
  };

  handleSelect = (e) => {
    const select = e.target.value;
    this.setState({
      selected: select,
    });
  };

  render() {
    const { isLoading, isError, isFound, isFilter, value, data, selected } =
      this.state;
    return (
      <div>
        <div className={css.input}>
          <label>
            Введите название города:
            <input value={value} onChange={this.handleChange} />
          </label>
        </div>
        <Dropdown
          isFilter={isFilter}
          onChange={this.handleFilterChange}
          onSelect={this.handleSelect}
          selected={selected}
        />
        {isLoading && <Loader />}
        {isError &&
          !isLoading &&
          isFound &&
          "Произошла ошибка, попробуйте позже"}
        {isError &&
          !isLoading &&
          !isFound &&
          "Искомый город не найден - попробуйте изменить запрос"}
        {!isError && !isLoading && isFound && (
          <WeatherInfoTable value={value} data={data} />
        )}
      </div>
    );
  }
}
