import styles from "@/styles/products_table.module.css";
import { useState } from "react";
import { Data } from "./api/products";

/**
 * React component that renders a filterable table of products
 *
 * @param {Array<Data>} products - An array of product data
 * @returns {JSX.Element} - The rendered React component
 */
export function FilterableProductsTable({
  products,
}: {
  products: Array<Data>;
}): JSX.Element {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductsTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}

/**
 * React component that renders a search bar
 *
 * @param {string} filterText - The search bar text
 * @param {boolean} inStockOnly - Whether to filter products in stock only
 * @param {(filterText: string) => void} onFilterTextChange - Function to handle search bar text changes
 * @param {(inStockOnly: boolean) => void} onInStockOnlyChange - Function to handle "in stock only" checkbox changes
 * @returns {JSX.Element} - The rendered React component
 */
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
}): JSX.Element {
  return (
    <form className={styles.searchBar}>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

/**
 * React component that renders a table of products
 *
 * @param {Array<Data>} products - An array of product data
 * @param {string} filterText - The search bar text
 * @param {boolean} inStockOnly - Whether to filter products in stock only
 * @returns {JSX.Element} - The rendered React component
 */
function ProductsTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Array<Data>;
  filterText: string;
  inStockOnly: boolean;
}) {
  let rows: Array<JSX.Element> = filterProducts(
    products,
    filterText,
    inStockOnly
  );

  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

/**
 * Renders a table row with a cell containing the category name for a group of products
 *
 * @param {Object} props - The component props
 * @param {string} props.category - The name of the category
 * @returns {JSX.Element} - A table row with a cell containing the category name
 */
function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

/**
 * Renders a row in the products table for a single product.
 *
 * If the product is not in stock, the product name is rendered in red.
 *
 * @param {Object} props - The props object containing the product data.
 * @param {Object} props.product - The product object containing the product's data.
 * @param {string} props.product.name - The name of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {boolean} props.product.stocked - Whether or not the product is in stock.
 * @returns {JSX.Element} - The JSX representation of the product row.
 */
function ProductRow({ product }: { product: Data }): JSX.Element {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

/**
 * Filters the given array of products based on the filter text and inStockOnly flag.
 *
 * Returns an array of JSX elements representing the filtered products.
 *
 * @param {Array<Data>} products - The array of products to filter.
 * @param {string} filterText - The text to filter products by.
 * @param {boolean} inStockOnly - Whether to show only products that are in stock.
 * @returns {Array<JSX.Element>} An array of JSX elements representing the filtered products.
 */
function filterProducts(
  products: Array<Data>,
  filterText: string,
  inStockOnly: boolean
): Array<JSX.Element> {
  let rows: Array<JSX.Element> = [];

  let filter = filterText.toLowerCase();
  let lastCategory = "";

  products.forEach((product) => {
    let name = product.name.toLowerCase();

    if (name.indexOf(filter) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={name} />);
    lastCategory = product.category;
  });

  return rows;
}
