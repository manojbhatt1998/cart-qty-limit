// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const errors = input.cart.lines
    .filter(({ quantity, merchandise }) => {
      if (merchandise.__typename === "ProductVariant") {
        const limit = merchandise.product.metafield?.value;
        return limit && quantity > Number(limit);
      }
    })
    .map(() => ({
      localizedMessage: "Not possible to order more than one of each test",
      target: "cart",
    }));

  return {
    errors,
  };
}