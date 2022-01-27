import { getProducts } from "../api/productAPI"

let fetchSpy

beforeEach(() => {
	fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve({})
		})
	);
});

test('getProducts is called with correct URL', () => {
  getProducts()

  expect(fetchSpy).toBeCalledWith('https://lexi-product.ee-cognizantacademy.com/products')
})