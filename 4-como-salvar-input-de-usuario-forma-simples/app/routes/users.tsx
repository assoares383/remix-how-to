import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "../db.server";

import { UsersTable } from "~/components/UsersTable";

export async function loader() {
  const users = await db.user.findMany();

  return json({ users });
}

export default function () {
  const { users } = useLoaderData<typeof loader>();

  return <UsersTable users={users} />;
}
