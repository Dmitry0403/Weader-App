import React from "react";
import css from "./styles.module.css";

export function WeatherInfoTable(props) {
  const data = props.data;
  return (
    <div>
      <table className={css.infoTable}>
        <caption>Метеопоказания в городе {props.value}</caption>
        <thead>
          <tr>
            <th scope="col">температура</th>
            <th scope="col">температура ощущается</th>
            <th scope="col">давление</th>
            <th scope="col">влажность</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.main.temp}</td>
            <td>{data.main.feels_like}</td>
            <td>{data.main.pressure}</td>
            <td>{data.main.humidity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
