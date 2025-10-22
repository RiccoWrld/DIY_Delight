// src/utilities/calcPrice.js
export const calculatePrice = (basePrice, color, wheelType) => {
  const colorPrices = {
    Black: 1000,
    Blue: 1200,
    Red: 1500,
    Pink: 1300,
    Green: 1100,
    White: 900,
  };

  const wheelTypePrices = {
    Alloy: 3000,
    Steel: 2000,
    Chrome: 4000,
  };

  const colorPrice = color ? colorPrices[color] || 0 : 0;
  const wheelPrice = wheelType ? wheelTypePrices[wheelType] || 0 : 0;

  return basePrice + colorPrice + wheelPrice;
};
