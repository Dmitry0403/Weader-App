import css from "./styles.module.css";

export function WeatherInfoTable(props) {
  const data = props.data;
  const value = props.value;
  if (!value) {
    return <div>Введите название города</div>;
  }
  return (
    <div>
      <table className={css.infoTable}>
        <caption>
          Метеопоказания в городе {value[0].toUpperCase() + value.slice(1)}
        </caption>
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
