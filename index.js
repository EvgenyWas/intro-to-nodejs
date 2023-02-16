const fs = require("node:fs");
const { parse } = require("csv-parse");

const HABITABLE_VALUES = {
  disposition: "CONFIRMED",
  min_insolation: 0.36,
  max_insolation: 1.11,
  radius: 1.6,
};

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  const isHabitableDisposition =
    planet.koi_disposition === HABITABLE_VALUES.disposition;
  const isOverMinInsolation =
    planet.koi_insol > HABITABLE_VALUES.min_insolation;
  const isUnderMaxInsolation =
    planet.koi_insol < HABITABLE_VALUES.max_insolation;
  const isUnderHabitableRadius = planet.koi_prad < HABITABLE_VALUES.radius;

  return (
    isHabitableDisposition &&
    isOverMinInsolation &&
    isUnderMaxInsolation &&
    isUnderHabitableRadius
  );
}

fs.createReadStream("./kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(`We have ${habitablePlanets.length} habitable planet(s)`);
  });
