/**
 * Class to initialize International Telephone Input
 * in the Smart Phone Number Input
 *
 * @since 1.2.0
 */

import { codesISO2, codesISO2European } from '../utils'
<<<<<<< HEAD
import $ from 'jquery'
=======
// import $ from 'jquery'
>>>>>>> 907480cb5e2504e7c0ff141fee5c2ee49609e24c
import intlTelInput from 'intl-tel-input'
// import * as intlTelInputUtils from '../../../node_modules/intl-tel-input/build/js/utils.js'

/**
 * Class to initialize International Telephone Input
 */
class IntlTelInputInitializer {
  /**
   * Constructor method to initialize parent element
   * @param {jQuery} $parentElement - The parent element.
   */
  constructor ($parentElement) {
    this.$parentElement = $parentElement
  }

  /**
   * Method to initialize the International Telephone Input
   */
  init () {
    const $inputPath = this.getInputPath()

    jQuery($inputPath).each((index, element) => {
      const $input = jQuery(element)
      const dataAttributes = this.extractDataAttributes($input)

      this.initializeIntlTelInput($input, dataAttributes)
    })
  }

  /**
   * Method to get the input path
   * @returns {jQuery} Input element path
   */
  getInputPath () {
    return this.$parentElement.find('.spn-container input[type="tel"]')
  }

  /**
   * Method to extract data attributes from input
   * @param {jQuery} $input - Input element.
   * @returns {Object} Extracted data attributes
   */
  extractDataAttributes ($input) {
    const onlyCountries = this.getOnlyCountries($input)
    const excludeCountries = this.getExcludeCountries($input)
    const allowIpLookUp = this.getIpLookUp($input, onlyCountries.defaultCountry)
    const preferredCountries = $input.data('preffered-countries').split(',')
    const allowDropdown = Boolean($input.data('allow-dropdown'))
    const nationalMode = Boolean($input.data('national-mode'))
    const autoHideDialCode = Boolean($input.data('auto-hide-dial-code'))
    const separateDialCode = Boolean($input.data('separate-dial-code'))
    const formatOnDisplay = Boolean($input.data('format-on-display'))

    return {
      onlyCountries: onlyCountries.onlyCountries,
      defaultCountry: onlyCountries.defaultCountry,
      preferredCountries,
      allowDropdown,
      nationalMode,
      autoHideDialCode,
      excludeCountries,
      allowIpLookUp,
      separateDialCode,
      formatOnDisplay
    }
  }

  /**
   * Method to initialize the International Telephone Input plugin
   * @param {jQuery} $input - Input element.
   * @param {Object} dataAttributes - Extracted data attributes.
   */
  initializeIntlTelInput ($input, dataAttributes) {
    intlTelInput($input[0], {
      initialCountry: dataAttributes.defaultCountry,
      preferredCountries: dataAttributes.preferredCountries,
      onlyCountries: dataAttributes.onlyCountries || [],
      allowDropdown: dataAttributes.allowDropdown,
      nationalMode: dataAttributes.nationalMode,
      autoHideDialCode: dataAttributes.autoHideDialCode,
      excludeCountries: dataAttributes.excludeCountries || [],
      geoIpLookup: dataAttributes.allowIpLookUp,
      separateDialCode: dataAttributes.separateDialCode,
      formatOnDisplay: dataAttributes.formatOnDisplay
    })
  }

  /**
   * Method to get only countries
   * @param {jQuery} $input - Input element.
   * @returns {Object} Only countries and default country
   */
  getOnlyCountries ($input) {
    let onlyCountries = $input.data('only-countries').split(',')
    const defaultCountry = $input.data('default-country')

    if (onlyCountries.includes('all')) {
      const allCountries = [...window.intlTelInputGlobals.getCountryData()]
      onlyCountries = codesISO2(allCountries)
    } else if (onlyCountries.includes('european')) {
      onlyCountries = onlyCountries.remove('european')
      onlyCountries = onlyCountries.concat(codesISO2European)
    }
    
    return {
      onlyCountries,
      defaultCountry
    }
  }

  /**
   * Method to get exclude countries
   * @param {jQuery} $input - Input element.
   * @returns {Array} Exclude countries
   */
  getExcludeCountries ($input) {
    let excludeCountries = $input.data('exclude-countries')

    if (excludeCountries) {
      excludeCountries = excludeCountries.split(',')
    }

    return excludeCountries
  }

  /**
   * Method to get IP Lookup
   * @param {jQuery} $input - Input element.
   * @param {string} defaultCountry - Default country.
   * @returns {Function|null} IP Lookup callback function or null
   */
  getIpLookUp ($input, defaultCountry) {
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

    return allowIpLookUp
  }
}

/**
 * Add remove method to Array object
 *
 * @param {*} value value to remove from array
 * @returns {Array} New Array without given value
 */

/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.remove = function (value) {
  return this.filter(function (element) { return element !== value })
}

export { IntlTelInputInitializer }
