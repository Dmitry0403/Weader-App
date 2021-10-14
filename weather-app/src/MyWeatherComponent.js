import React from "react";
import css from "./styles.module.css";
import { Loader } from "./Loader";
import { debounce } from "lodash";
import { WeatherInfoTable } from "./WeatherInfoTable/WeatherInfoTable";
import { Dropdown } from "./Dropdown/Dropdown";

const withFetch = (Component, baseUrl) => {
  return class extends React.Component {
    state = {
      isLoading: false,
      isError: false,
      isFound: true,
      data: [],
    };

    fetchData = async (AppKey, value, selectedUnit) => {
      
      const searchParams = new URLSearchParams({
        appid: AppKey,
        q: value,
        units: selectedUnit,
      }).toString();
      
      const url = baseUrl + searchParams;
      
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
          throw new Error("ошибка получения данных");
        })
        .then((data) => {
          this.setState({
            data: data.main,
            isFound: true,
            isError: false,
          });
        })
        .catch(() => {
          this.setState({
            isError: true,
          });
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    };
    render() {
      return (
        <Component fetchData={this.fetchData} {...this.state} {...this.props} />
      );
    }
  };
};

class MyWeatherComponent extends React.Component {
  state = {
    value: "minsk",
    selectedUnit: "metric",
  };

  getData = () => {
    const AppKey = process.env.REACT_APP_OPEN_WEATHER_TOKEN;
    const { value, selectedUnit } = this.state;
    const { fetchData } = this.props;
    fetchData(AppKey, value, selectedUnit);
  };

  componentDidMount() {
    this.getData();
  }

  getDataDebounced = debounce(this.getData, 1500);

  componentDidUpdate(_, prevState) {
    if (this.state.value !== prevState.value) {
      this.getDataDebounced();
    } else if (this.state.selectedUnit !== prevState.selectedUnit) {
      this.getData();
    } else return;
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSelect = (e) => {
    this.setState({
      selectedUnit: e.target.value,
    });
  };

  render() {
    const { value, selectedUnit } = this.state;
    const { isLoading, isError, isFound, data } = this.props;
    return (
      <div className={css.wrapper}>
        <div className={css.input}>
          <label>
            Введите название города:
            <input
              className={css.input}
              value={value}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <Dropdown onSelect={this.handleSelect} selectedUnit={selectedUnit} />
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
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
export const MyWeatherComponentWithFetch = withFetch(
  MyWeatherComponent,
  baseUrl
);
