import { getCart, postProduct, deleteProduct } from "../api/cartAPI"

let fetchSpy

let product = {
	"productId": 14,
	"productName": "Vtg Julie Dress",
	"unitPrice": 88.0,
	"imageUrl": "https://live.staticflickr.com/65535/51636554415_9503c8d1d6_o.png",
	"brand": "Sans Souci",
	"size": "S",
	"category": {
		"categoryName": "Dresses",
		"imageUrl": "https://live.staticflickr.com/65535/51593374670_82f0b04d70_t.jpg",
		"categoryId": 3
	}
}

let user = "alejandra@cognizant.com"

beforeEach(() => {
	fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve({})
		})
	);
});

test('getCart is called with correct URL', () => {
	getCart()

	expect(fetchSpy).toBeCalledWith('https://lexi-cart.ee-cognizantacademy.com/cart')
})

test('postProduct is called with correct URL', () => {
	postProduct(user, product)

	expect(fetchSpy).toBeCalledWith("https://lexi-cart.ee-cognizantacademy.com/cart", {"body": "{\"user\":\"alejandra@cognizant.com\",\"product\":{\"productId\":14,\"productName\":\"Vtg Julie Dress\",\"unitPrice\":88,\"imageUrl\":\"https://live.staticflickr.com/65535/51636554415_9503c8d1d6_o.png\",\"brand\":\"Sans Souci\",\"size\":\"S\",\"category\":{\"categoryName\":\"Dresses\",\"imageUrl\":\"https://live.staticflickr.com/65535/51593374670_82f0b04d70_t.jpg\",\"categoryId\":3}}}", "headers": {"Content-Type": "application/json"}, "method": "POST"})
})

test('deleteProduct is called with correct URL', () => {
  deleteProduct(user, product)

  expect(fetchSpy).toBeCalledWith("https://lexi-cart.ee-cognizantacademy.com/cart/14", {"body": "{\"user\":\"alejandra@cognizant.com\",\"product\":{\"productId\":14,\"productName\":\"Vtg Julie Dress\",\"unitPrice\":88,\"imageUrl\":\"https://live.staticflickr.com/65535/51636554415_9503c8d1d6_o.png\",\"brand\":\"Sans Souci\",\"size\":\"S\",\"category\":{\"categoryName\":\"Dresses\",\"imageUrl\":\"https://live.staticflickr.com/65535/51593374670_82f0b04d70_t.jpg\",\"categoryId\":3}}}", "headers": {"Content-Type": "application/json"}, "method": "DELETE"})
})