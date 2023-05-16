import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "../remix-forms";

import formStyles from "../styles/forms.css";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import type { LogiInInput } from "~/features/Auth";
import { login } from "~/features/Auth";
import { LoginInputSchema } from "~/features/Auth";
import { commitSession, getSession } from "~/session.server";

export function links() {
  return [{ rel: "stylesheet", href: formStyles }];
}

const mutation = makeDomainFunction(LoginInputSchema)(async (values) => {
  return login(values);
});

export async function action({ request }: ActionArgs) {
  const result = await performMutation({
    request,
    schema: LoginInputSchema,
    mutation,
  });

  if (!result.success) {
    return result;
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("user", result.data);

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

const values: LogiInInput = {
  email: "Matilde31@yahoo.com",
  password: "123456",
};

export default function () {
  return (
    <Form
      schema={LoginInputSchema}
      values={values}
      className="custom-form login-form"
    >
      {({ Field, Errors, Button }) => (
        <>
          <Field name="email" autoFocus />
          <Field name="password" type="password" />
          <Errors />
          <Button />
        </>
      )}
    </Form>
  );
}
