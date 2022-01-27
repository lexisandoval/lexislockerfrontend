import { getProductsByCategory } from "../api/productAPI"

let fetchSpy

beforeEach(() => {
	fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve({})
		})
	);
});

test('getProductsByCategory is called with correct URL', () => {
  getProductsByCategory(1)

  expect(fetchSpy).toBeCalledWith('https://lexi-product.ee-cognizantacademy.com/categories/1/products')
})