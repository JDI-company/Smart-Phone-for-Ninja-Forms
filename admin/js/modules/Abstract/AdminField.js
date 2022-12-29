/**
 * Abstract Class
 *
 * @class AdminField
 */

import { propDisabled, propSelected } from '../../utils'

const $ = jQuery

export class AdminField {
  /**
   * Abstract Fields
   *
   * @param {Node} $field
   * @param {string} fieldSelector
   */
  $field
  fieldSelector

  /**
   * Constructor
   *
   * @param {string} fieldSelector
   */
  constructor (fieldSelector) {
    if (this.constructor === AdminField) {
      throw new Error('Object of Abstract Class cannot be created')
    }
  }

  /**
   * Get Admin Field as Node by checking body updates
   *
   * @return {Node}
   */
  findField () {
    if (!$(this.fieldSelector).length) {
      const target = document.body
      const config = {
        childList: true
      }

      // Create an observer instance.
      const observer = new MutationObserver((mutationList, _observer) => {
        if ($(this.fieldSelector).length) {
          this.$field = $(this.fieldSelector)
          _observer.disconnect()
        }
      })

      // Pass in the target node, as well as the observer config.
      observer.observe(target, config)
    }

    return $(this.fieldSelector)
  }

  /**
   * Handle Field On Change
   *
   * @param {Function} callback
   */
  handleOnChange (callback) {
    $(document).on('change', this.fieldSelector, function () {
      const currentValue = $(this).val()

      callback(currentValue)
    })
  }

  /**
   * Set Field Value
   *
   * @param {array} optionValueSelector - Array of values 'All', 'European', 'dz' (ISO 2 Code)
   * @param {Boolean} value - True or False
   */
  setFieldValue (optionValueSelector, value) {
    if (!Array.isArray(optionValueSelector)) {
      optionValueSelector = [optionValueSelector]
    }

    if (value !== true || value !== false) {
      throw new Error('setFieldValue: wrong value, should be boolean')
    }

    optionValueSelector.forEach(_optionValueSelector => {
      // Handle data
      _optionValueSelector = _optionValueSelector.toLowerCase()
      const optionSelector = `${this.fieldSelector} option[value="${_optionValueSelector}"]`

      if ($(optionSelector).length) {
        propSelected(optionSelector, value)
      } else {
        throw new Error(this.getErrorOptionNotFound())
      }
    })
  }

  /**
   * Get <option> tags from field by status
   * You can choose return type
   *
   * @param {Enum} type - 'all', 'active', 'unactive', 'selected', 'unselected'
   * @param {Enum} returnType - 'node' (HTML Elements), 'value'
   * @return {Array<Nodes>} - HTML Nodes inside field
   */
  getOptions (type = 'all', returnType = 'node') {
    switch (type) {
      case 'all':
        return [...this.$field?.find('option')].map(($option) => {
          return getValueByType($option)
        })
      case 'active':
        return [...this.$field?.find('option:not([disabled="disabled"])')].map(($option) => {
          return getValueByType($option)
        })
      case 'unactive':
        return [...this.$field?.find('option[disabled="disabled"]')].map(($option) => {
          return getValueByType($option)
        })
      case 'selected':
        return [...this.$field?.find('option:checked')].map(($option) => {
          return getValueByType($option)
        })
      case 'unselected':
        return [...this.$field?.find('option:not(:checked)')].map(($option) => {
          return getValueByType($option)
        })
      default:
        throw new Error('getOptions: type is wrong!')
    }

    /**
     * Get Option Value By Return Type argument
     *
     * @param {Node} $option
     * @return {Node|string}
     */
    function getValueByType ($option) {
      switch (returnType) {
        case 'node':
          return $($option)
        case 'value':
          return $($option).val()
        default:
          throw new Error('getOptions: returnType is wrong!')
      }
    }
  }

  /**
   * Disable options inside field by selector
   * It sets attribute 'disabled="disabled"' or removes it
   *
   * @param {Array<String>|string} optionValueSelector
   * @param {Boolean} value
   */
  disableOptions (optionValueSelector, value) {
    if (!Array.isArray(optionValueSelector)) {
      optionValueSelector = [optionValueSelector]
    }

    if (value !== true || value !== false) {
      throw new Error('disableOptions: wrong value, should be boolean')
    }

    optionValueSelector.forEach(_optionValueSelector => {
      // Handle data
      _optionValueSelector = _optionValueSelector.toLowerCase()
      const optionSelector = `${this.fieldSelector} option[value="${_optionValueSelector}"]`

      if ($(optionSelector).length) {
        propDisabled(optionSelector, value)
      } else {
        throw new Error(this.getErrorOptionNotFound())
      }
    })
  }

  /**
   * Error Message if option inside field was not found
   */
  getErrorOptionNotFound () {
    throw new Error('getErrorOptionNotFound should be implemented!')
  }
}
