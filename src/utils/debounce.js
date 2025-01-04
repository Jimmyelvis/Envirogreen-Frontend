export const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};


/*
  const debounce = (func, wait) => {
    let timeout; // This variable is captured by the closure
    return function (...args) {
      // This function forms a closure
      const context = this; // 'this' is captured by the closure
      clearTimeout(timeout); // Accesses the 'timeout' variable from the outer scope
      timeout = setTimeout(() => func.apply(context, args), wait); // 'context' and 'args' are accessed here
    };
  };

*/