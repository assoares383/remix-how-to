import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Holiday = {
  name: string;
  date: string;
  type: string;
};

export async function loader() {
  const holidays: Holiday[] = await fetch(
    "https://brasilapi.com.br/api/feriados/v1/2023"
  ).then((res) => res.json());

  return json(holidays);
}

export default function () {
  const holidays = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Feriados Nacionais em 2023</h1>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.name}>{holiday.name}</li>
        ))}
      </ul>
    </>
  );
}
