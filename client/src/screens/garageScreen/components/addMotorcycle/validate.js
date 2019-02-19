const validate = (values) => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Motorcycle name is required';
  }

  if (!values.make || values.make.trim() === '') {
    errors.make = 'Motorcycle make is required';
  }

  if (!values.model || values.model.trim() === '') {
    errors.model = 'Motorcycle model is required';
  }

  if (!values.year || values.year === '') {
    errors.year = 'Motorcycle year is required';
  } else if (values.year && typeof values.year !== 'number') {
    errors.year = 'Year must be a number';
  }

  if (!values.miles) {
    errors.miles = 'Current motorcycle miles is required. (It can be an close estimate.)';
  } else if (values.miles && typeof values.miles !== 'number') {
    errors.miles = 'Miles must be a number';
  }

  return errors;
};

export default validate;
