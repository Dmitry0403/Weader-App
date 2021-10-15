import css from "./styles.module.css";

export function WeatherInfoTable(props) {
  const { data, value } = props;
  const titles = ["температура", "ощущается", "давление, гПа", "влажность, %"];
  const dataItems = ["temp", "feels_like", "pressure", "humidity"];

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
            {titles.map((item) => (
              <th scope="col" key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {dataItems.map((item) => (
              <td key={item}>{data[item]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
