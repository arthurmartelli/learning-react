import styles from "@/styles/home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FilterableProductsTable } from "./products_table";

/**
 * The Home component renders the main page of the application.
 *
 * It fetches the data from the server through the API and passes it to the
 *
 * FilterableProductsTable component to display the products in a filterable table.
 *
 * @returns {JSX.Element} A JSX Element that represents the Home component
 */
export default function Home(): JSX.Element {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // request data from the api
    const fetchProducts = async () => {
      const response = await fetch("../api/products");
      const data = await response.json();
      setProducts(data); // set the fetched data to the state
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Thinking React</title>
        <meta name="description" content="Table of products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FilterableProductsTable products={products} />
      </main>
    </>
  );
}
