import { ProductList, getProducts } from "~/features/Products";
import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { Cart } from "~/features/Cart";

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