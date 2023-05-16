import type { ActionArgs } from "@remix-run/node";
import { makeDomainFunction } from "domain-functions";
import { ErrorFeedback } from "~/components";
import { UserForm, saveUser, schema } from "~/features/Users";
import { FormAction } from "~/remix-forms";

const mutation = makeDomainFunction(schema)(
  async (data) => await saveUser(data)
);

export const action = async ({ request }: ActionArgs) =>
  FormAction({
    request,
    schema,
    mutation,
    successPath: "/users" /* path to redirect on success */,
  });

export default function () {
  return <UserForm />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorFeedback />;
}
