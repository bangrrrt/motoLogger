import { add, floatToAmount } from 'money-math';
import reduce from 'lodash/reduce';

const getTotalPartsAmount = (parts = []) => {
  const total = reduce(parts, (sum, part) => {
    const partPrice = part.partPrice === '' ? '0.0' : part.partPrice;
    return add(sum, floatToAmount(partPrice));
  }, '0.0')

  return total === 0 ? '$ 0.00' : `$ ${total}`;
};

export default getTotalPartsAmount;