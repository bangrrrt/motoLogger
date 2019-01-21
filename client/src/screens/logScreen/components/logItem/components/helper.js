import { add, floatToAmount } from 'money-math';
import reduce from 'lodash/reduce';

const getTotalPartsAmount = (parts = []) => {
  const total = reduce(parts, (sum, part) => {
    const price = part.price === '' ? '0.0' : part.price;
    return add(sum, floatToAmount(price));
  }, '0.0');

  return total === 0 ? '$ 0.00' : `$ ${total}`;
};

export default getTotalPartsAmount;
