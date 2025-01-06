export async function calculateTotalPrice(productsWithQuantities: { product: number, quantity: number }[]) {
    let totalPrice = 0;
  
    productsWithQuantities.forEach(item => {
      totalPrice += item.product * item.quantity;
    });
  
    return totalPrice; 
  }
  