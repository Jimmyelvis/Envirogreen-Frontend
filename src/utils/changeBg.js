
export const changeBg = (setScrolled, limit = 115) => {
  if (window.scrollY >= limit) {
    setScrolled(true);
  } else {
    setScrolled(false);
  }
};