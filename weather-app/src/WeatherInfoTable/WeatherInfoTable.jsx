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
            <td>{data.temp}</td>
            <td>{data.feels_like}</td>
            <td>{data.pressure}</td>
            <td>{data.humidity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
