export const formatPrice = (price) => {

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}

// format phone number
export const formatPhoneNumber = (phoneNumberString) => {
  // Remove non-digit characters
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');

  // Check for 10-digit phone numbers
  if (cleaned.length === 10) {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
  }

  // Check for 7-digit phone numbers
  if (cleaned.length === 7) {
    const match = cleaned.match(/^(\d{3})(\d{4})$/);
    if (match) {
      return   match[1] + ' - ' + match[2]; // Formats as (XXX) XXXX
    }
  }

  // Check for 10-digit phone numbers in the format XXX-XXX-XXXX
  if (phoneNumberString.match(/^\d{3}-\d{3}-\d{4}$/)) {
    return phoneNumberString; // Return the number as is
  }

  return 'not valid';
};
