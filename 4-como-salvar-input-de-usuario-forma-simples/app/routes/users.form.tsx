// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ActionArgs, redirect } from "@remix-run/node";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { User } from "@prisma/client";
import { UserForm } from "~/components/UserForm";
import { db } from "~/db.server";

export async function action({ request }: ActionArgs) {
  const data = Object.fromEntries(await request.formData());

  await db.user.create({
    data: data as unknown as User,
  });

  return redirect("/users");
}

export default function () {
  return <UserForm />;
}

export function ErrorBoundary() {
  return (
    <div className="bg-red-100 border border-red-500 p-12">
      Something went wrong
    </div>
  );
}
