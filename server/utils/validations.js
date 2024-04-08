const _isValidPhoneNumber = formattedNumber => {
  // Define parts of the regex to make it more readable
  const optionalCountryCode = /^(1 )?/ // Optional '1 ' at the beginning
  const areaCode = /\(\d{3}\)/ // Area code in the format (XXX)
  const mainNumber = / \d{3}-\d{4}$/ // Main number in the format XXX-XXXX

  // Combine parts to create the full regex for validation
  const fullRegex = new RegExp(optionalCountryCode.source + areaCode.source + mainNumber.source)

  if (formattedNumber?.length < 14 || formattedNumber?.length > 16) {
    return false
  }
  return fullRegex.test(formattedNumber?.toString())
}

module.exports = {
  _isValidPhoneNumber
}
