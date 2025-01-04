export const getuserRoles = (role) => {
  switch (role) {
    case 0:
      return "Subscriber";
      break;
    case 1:
      return "Author";
      break;
    case 2:
      return "Administrator";
      break;
    default:
      break;
  }
};