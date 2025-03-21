/**
 * Class to initialize International Telephone Input
 * in the Smart Phone Number Input
 *
 * @since 1.2.0
 */

import { codesISO2European, nfspnRemoveValue } from '../utils.js'
import $ from 'jquery'
import intlTelInputWithUtils from 'intl-tel-input/build/js/intlTelInputWithUtils.js'
import intlTelInputUtils from 'intl-tel-input/build/js/utils.js'

/**
 * Class to initialize International Telephone Input
 */
class IntlTelInputInitializer {
  /**
   * Constructor method to initialize parent element
   * @param {String} parentElement - The parent element.
   */
  constructor (parentElementId) {
    this.$parentElement = jQuery(parentElementId)
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
    const countryOrder = $input.data('country-order').split(',')
    const allowDropdown = Boolean($input.data('allow-dropdown'))
    const nationalMode = Boolean($input.data('national-mode'))
    const autoHideDialCode = Boolean($input.data('auto-hide-dial-code'))
    const separateDialCode = Boolean($input.data('separate-dial-code'))
    const formatOnDisplay = Boolean($input.data('format-on-display'))
    const excludeCountryCodeFromSubmission = Boolean($input.data('exclude-country-code-from-submission'))

    return {
      onlyCountries: onlyCountries.onlyCountries,
      defaultCountry: onlyCountries.defaultCountry,
      countryOrder,
      allowDropdown,
      nationalMode,
      autoHideDialCode,
      excludeCountries,
      allowIpLookUp,
      separateDialCode,
      formatOnDisplay,
      excludeCountryCodeFromSubmission
    }
  }

  /**
   * Method to initialize the International Telephone Input plugin
   * @param {jQuery} $input - Input element.
   * @param {Object} dataAttributes - Extracted data attributes.
   */
  initializeIntlTelInput ($input, dataAttributes) {
    intlTelInputWithUtils($input[0], {
      initialCountry: dataAttributes.defaultCountry,
      countryOrder: dataAttributes.countryOrder,
      onlyCountries: dataAttributes.onlyCountries,
      allowDropdown: dataAttributes.allowDropdown,
      nationalMode: dataAttributes.nationalMode,
      autoHideDialCode: dataAttributes.autoHideDialCode,
      excludeCountries: dataAttributes.excludeCountries,
      geoIpLookup: dataAttributes.allowIpLookUp,
      separateDialCode: dataAttributes.separateDialCode,
      formatOnDisplay: dataAttributes.formatOnDisplay,
      utilsScript: intlTelInputUtils
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
    const allCountries = [intlTelInputWithUtils.getCountryData()]
    const codesISO2 = allCountries.map((country) => {
      return country.iso2
    })

    if (onlyCountries.includes('all')) {
      onlyCountries = nfspnRemoveValue(onlyCountries, 'all')
      onlyCountries = onlyCountries.concat(codesISO2)
    } else if (onlyCountries.includes('european')) {
      onlyCountries = nfspnRemoveValue(onlyCountries, 'european')
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
      const ipLookupToken = $input.data('ip-lookup-api-key')

      allowIpLookUp = function (success, failure) {
        let URL = 'https://ipinfo.io';

        const query = {
          token: ipLookupToken ?? ''
        }

        if(query) {
          URL += '?' + new URLSearchParams(query).toString()
        }

        $.get(URL, function () {}, 'jsonp').always(function (resp) {
          const countryCode = (resp && resp.country) ? resp.country : defaultCountry
          success(countryCode)
        })
      }
      defaultCountry = 'auto'
    } else {
      allowIpLookUp = function () {
        return null
      }
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

export { IntlTelInputInitializer }
