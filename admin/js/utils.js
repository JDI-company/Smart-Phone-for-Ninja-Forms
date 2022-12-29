/**
 * Admin JavaScript Utils
 *
 * @since 1.0.0
 */

const $ = jQuery

// Get All Countries Codes from intTelInput
const allCountries = [...window.intlTelInputGlobals.getCountryData()]

// Set All ISO2 codes
const codesISO2 = allCountries.map((country) => {
  return country.iso2
})

// Set European ISO2 codes
const codesISO2European = ['al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cz', 'dk',
  'ee', 'fo', 'fi', 'fr', 'de', 'gi', 'gr', 'va', 'hu', 'is', 'ie', 'it', 'lv',
  'li', 'lt', 'lu', 'mk', 'mt', 'md', 'mc', 'me', 'nl', 'no', 'pl', 'pt', 'ro',
  'ru', 'sm', 'rs', 'sk', 'si', 'es', 'se', 'ch', 'ua', 'gb']

/**
 * @param {selector} $selector - Selector (".nf-field-wrap" - example)
 * @param {Boolean} $value - True or False
 */
function propDisabled ($selector, value) {
  if (value === true) {
    $($selector).attr('disabled', 'disabled')
  } else if (value === false) {
    $($selector).removeAttr('disabled')
  } else {
    throw new Error('PropDisabled: Wrong value')
  }
}

/**
 * @param {selector} $selector - Selector (".nf-field-wrap" - example)
 * @param {Boolean} $value - True or False
 */
function propSelected ($selector, value) {
  if (value === true) {
    $($selector).attr('selected', 'selected')
  } else if (value === false) {
    $($selector).removeAttr('selected')
  } else {
    throw new Error('propSelected: Wrong value')
  }
}

export { propDisabled, propSelected, codesISO2, codesISO2European }
