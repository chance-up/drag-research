// import ArrayStorage from "../lib/storage";

// // data에 access 하는 basic code를 이곳에서 관리한다.
// const CartProductRepository = {
//   fetchCartProductList(): CartProductDTO[] {
//     try {
//       const cartProducts =
//         ArrayStorage.getItems<CartProductDTO>("cartProducts");
//       return cartProducts;
//     } catch (error) {
//       throw new Error("Failed to fetch cart product list!");
//     }
//   },

//   insertCartProduct(cartProduct: CartProductDTO) {
//     try {
//       ArrayStorage.pushItems<CartProductDTO>("cartProducts", cartProduct);
//     } catch (error) {
//       throw new Error("Failed to insert cart product!");
//     }
//   },

//   updateCartProduct(cartProduct: CartProductDTO): void {
//     try {
//       const cartProducts =
//         ArrayStorage.getItems<CartProductDTO>("cartProducts");
//       const findIdx = cartProducts.findIndex(
//         item => item.item_no === cartProduct.item_no,
//       );
//       if (findIdx === -1) {
//         throw new Error("Product does not exist!");
//       }
//       cartProducts[findIdx] = cartProduct;
//       ArrayStorage.setItems("cartProducts", cartProducts);
//     } catch (error) {
//       throw new Error("Failed to update cart product!");
//     }
//   },

//   removeCartProduct(itemNo: number) {
//     try {
//       const cartProducts =
//         ArrayStorage.getItems<CartProductDTO>("cartProducts");
//       const findIdx = cartProducts.findIndex(item => item.item_no === itemNo);
//       if (findIdx === -1) {
//         throw new Error("Product does not exist!");
//       }
//       cartProducts.splice(findIdx, 1);
//       ArrayStorage.setItems("cartProducts", cartProducts);
//     } catch (error) {
//       throw new Error("Failed to remove cart product!");
//     }
//   },

//   clearCartProduct() {
//     try {
//       ArrayStorage.clearItems("cartProducts");
//     } catch (error) {
//       throw new Error("Failed to clear cart product!");
//     }
//   },
// };

// export default CartProductRepository;
