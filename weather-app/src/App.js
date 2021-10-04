import React from "react";
import css from "./styles.module.css";
import { Loader } from "./Loader";
import { debounce } from "lodash";
import { WeatherInfoTable } from "./WeatherInfoTable/WeatherInfoTable";

export class App extends React.Component {
  state = {
    isLoading: false,
    isError: false,
    value: "minsk",
    data: [],
  };

  getData = async () => {
    const AppKey = process.env.REACT_APP_OPEN_WEATHER_TOKEN;
    const value = this.state.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${AppKey}&q=${value}&units=metric`;
    this.setState({
      isLoading: true,
    });

    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("ошибка");
      })
      .then(({ data }) => {
        this.setState({ data });
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

  componentDidUpdate(prevProps) {
    if (this.state.value === prevProps.value) {
      return;
    }
    this.getDataDebounced();
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { isLoading, isError, value, data } = this.state;
    return (
      <div>
        <div className={css.input}>
          <label>
            Введите название города:
            <input value={value} onChange={this.handleChange} />
          </label>
        </div>
        {isLoading && <Loader />}
        {isError && !isLoading && "Произошла ошибка, попробуйте позже"}
        {!isError && !isLoading && (
          <WeatherInfoTable value={value} data={data} />
        )}
      </div>
    );
  }
}
