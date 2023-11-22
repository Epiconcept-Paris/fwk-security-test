function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Fonction pour calculer la somme et le produit de deux nombres.
export default calculate = (n1, n2, operation) => {
  if (operation === 'add') {
    result = add(n1, n2);
  } else if (operation === 'multiply') {
    result = multiply(n1, n2);
  } else {
    throw new Error('Invalid operation');
  }
  return result;
};
