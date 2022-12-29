/**
 * Ninja Forms SPN Addon Public JavaScript Code (Front-end)
 *
 * @since 1.0.0
 */

/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.remove = function (value) {
  return this.filter(function (element) { return element !== value })
}

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

function formSettings () {
  'use strict'

  $(window).on('load', function () {
    $('.nf-field-container.spn-container input').each(function () {
      const $input = $(this)

      let onlyCountries = $input.data('only-countries').split(',')
      if (onlyCountries.includes('all')) {
        onlyCountries = codesISO2
      } else if (onlyCountries.includes('european')) {
        onlyCountries = onlyCountries.remove('european')
        onlyCountries = onlyCountries.concat(codesISO2European)
      }

      const preferredCountries = $input.data('preffered-countries').split(',')
      let defaultCountry = $input.data('default-country')
      const allowDropdown = Boolean($input.data('allow-dropdown'))
      const nationalMode = Boolean($input.data('national-mode'))
      const autoHideDialCode = Boolean($input.data('auto-hide-dial-code'))

      let excludeCountries = $input.data('exclude-countries')
      if (excludeCountries) {
        excludeCountries = excludeCountries.split(',')
      }

      let allowIpLookUp = Boolean($input.data('allow-ip-lookup'))
      if (allowIpLookUp) {
        allowIpLookUp = function (success, failure) {
          $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (resp) {
            const countryCode = (resp && resp.country) ? resp.country : defaultCountry
            success(countryCode)
          })
        }
        defaultCountry = 'auto'
      } else {
        allowIpLookUp = null
      }

      const separateDialCode = Boolean($input.data('separate-dial-code'))
      const formatOnDisplay = Boolean($input.data('format-on-display'))

      $input.intlTelInput({
        initialCountry: defaultCountry,
        preferredCountries,
        onlyCountries,
        allowDropdown,
        nationalMode,
        autoHideDialCode,
        excludeCountries,
        geoIpLookup: allowIpLookUp,
        separateDialCode,
        formatOnDisplay,
        utilsScript: '../../vendor/intl-tel-input-master/build/js/utils.js'
      })
    })
  })
}

formSettings()
