exports.getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

exports.userDataToSend = function ({
  username,
  firstName,
  lastName,
  motorcycles
}) {
  return {
    username,
    firstName,
    lastName,
    motorcycles
  };
};
