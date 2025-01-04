export const checkAuthRole = (currentUser) => {
  const allowedRoles = [
    "Admin",
    "SuperAdmin",
    "Sales",
    "Agent",
    "Founder"
  ]


  if (!allowedRoles.includes(currentUser?.role?.name)) {
    return false;
  }

  return true;
}