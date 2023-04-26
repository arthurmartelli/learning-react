import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Represents a product object with category, price, stocked, and name properties
 *
 * @typedef {Object} Data
 * @property {string} category - The category of the product
 * @property {string} price - The price of the product
 * @property {boolean} stocked - A boolean indicating whether the product is currently stocked
 * @property {string} name - The name of the product
 */
export type Data = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};


/**
 * Returns a sorted array of product objects by category in ascending order
 *
 * @param {Object} req - The Next.js API request object
 * @param {Object} res - The Next.js API response object
 * @returns {void}
 */
export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
): void {
  let result = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ]

  let sorted_result = sort_by_category(result);

  res.status(200).send(sorted_result);
}

/**
 * Sorts an array of objects by category property in ascending order
 *
 * @param {Array<Object>} arr - The array of objects to be sorted
 * @returns {Array<Object>} - The sorted array of objects
 */
function sort_by_category(arr: Array<Data>): Array<Data> {
  // clone the array to not make changes to it
  const sorted = [...arr].sort((a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  });

  return sorted;
}
