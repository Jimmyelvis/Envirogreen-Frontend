export const sortElems = (object1, object2, key) => {
  const obj1 = object1[key];
  const obj2 = object2[key];

  if (obj1 < obj2) {
    return -1;
  }
  if (obj1 > obj2) {
    return 1;
  }
  return 0;
};