import css from "./styles.module.css";

export function WeatherInfoTable(props) {
  const { data, value } = props;
  // const titles = ["температура", "ощущается", "давление, гПа", "влажность, %"];
  // const dataItems = ["temp", "feels_like", "pressure", "humidity"];

  const dataItems = [
    { title: "температура", dataItem: "temp" },
    { title: "ощущается", dataItem: "feels_like" },
    { title: "давление, гПа", dataItem: "pressure" },
    { title: "влажность, %", dataItem: "humidity" },
  ];

  if (!value) {
    return <div>Введите название города</div>;
  }
  return (
    <div className={css.infoTable}>
      <div class={css.caption}>
        Метеопоказания в городе {value[0].toUpperCase() + value.slice(1)}
      </div>
      <div className={css.container}>
        {dataItems.map((item) => (
          <div>
            <div className={css.item} key={item.title}>
              {item.title}
            </div>
            <div className={css.item} key={item.dataItem}>
              {data[item.dataItem]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
