import type { ActionArgs } from "@remix-run/node";
import { UserForm } from "~/components/UserForm";
import { db } from "~/db.server";

import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "~/form-action.server"; /* path to your custom formAction */

const schema = z.object({
  name: z.string().min(1, { message: "Please provide your name" }).trim(),
  email: z
    .string()
    .min(1, { message: "Please provide your email" })
    .email({ message: "Please provide a valid email" })
    .trim(),
  city: z.string().min(1, { message: "Please provide your city" }).trim(),
  state: z.string().min(1, { message: "Please provide your state" }).trim(),
});

const mutation = makeDomainFunction(schema)(
  async (data) => await db.user.create({ data })
);

export const action = async ({ request }: ActionArgs) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: "/users" /* path to redirect on success */,
  });

export default function () {
  return <UserForm schema={schema} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="bg-red-100 border border-red-500 p-12">
      <span className="text-red-500 font-bold text-2x1">
        Something went wrong
      </span>
      <pre className="text-red-500"></pre>
    </div>
  );
}
