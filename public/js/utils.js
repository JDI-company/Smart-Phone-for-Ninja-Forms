/**
 * Utils
 *
 * @since 1.2.0
 */

// Get All Countries Codes from intTelInput
const allCountries = [...window.intlTelInputGlobals.getCountryData()]

// Set European ISO2 codes
const codesISO2European = [
  'al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cz', 'dk',
  'ee', 'fo', 'fi', 'fr', 'de', 'gi', 'gr', 'va', 'hu', 'is',
  'ie', 'it', 'lv', 'li', 'lt', 'lu', 'mk', 'mt', 'md', 'mc',
  'me', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk',
  'si', 'es', 'se', 'ch', 'ua', 'gb'
]

// Set All ISO2 codes
const codesISO2 = allCountries.map((country) => {
  return country.iso2
})

// class Utils {
// }

export { allCountries, codesISO2European, codesISO2 }
