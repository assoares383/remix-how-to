import { redirect, json } from "@remix-run/node";
import { createFormAction } from "remix-forms";

const FormAction = createFormAction({ redirect, json });

export { FormAction };
