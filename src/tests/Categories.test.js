import { getCategories, getCategoryById } from "../api/categoryAPI"

let fetchSpy

beforeEach(() => {
	fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve({})
		})
	);
});

test('getCategories is called with correct URL', () => {
  getCategories()

  expect(fetchSpy).toBeCalledWith('https://lexi-product.ee-cognizantacademy.com/categories')
})

test('getCategoryById is called with correct URL', () => {
  getCategoryById(2)

  expect(fetchSpy).toBeCalledWith('https://lexi-product.ee-cognizantacademy.com/categories/2')
})