import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { UsersTable, getUsers } from "~/features/Users";
import { ErrorFeedback } from "~/components";

export async function loader() {
  return json({ users: await getUsers() });
}

export default function () {
  const { users } = useLoaderData<typeof loader>();

  return <UsersTable users={users} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorFeedback />;
}
