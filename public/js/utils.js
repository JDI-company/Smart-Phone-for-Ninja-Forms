/**
 * Utils
 *
 * @since 1.2.0
 */
// Set European ISO2 codes
const codesISO2European = [
  'al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cz', 'dk',
  'ee', 'fo', 'fi', 'fr', 'de', 'gi', 'gr', 'va', 'hu', 'is',
  'ie', 'it', 'lv', 'li', 'lt', 'lu', 'mk', 'mt', 'md', 'mc',
  'me', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk',
  'si', 'es', 'se', 'ch', 'ua', 'gb'
]

function nfspnRemoveValue (obj, value) {
  return obj.filter(function (element) { return element !== value })
}

export { codesISO2European, nfspnRemoveValue }
