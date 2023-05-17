import { ProductList, getProduct, getProducts } from "~/features/Products";
import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Cart } from "~/features/Cart";
import type { ActionArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const product = await getProduct({ id: Number(data.productId) });

  console.log("product", product);

  return null;
}

export async function loader({ request }: LoaderArgs) {
  const products = await getProducts();
  return json({ products });
}

export default function () {
  const { products } = useLoaderData<typeof loader>();
  return (
    <>
      <Cart />
      <ProductList products={products} />
    </>
  );
}
