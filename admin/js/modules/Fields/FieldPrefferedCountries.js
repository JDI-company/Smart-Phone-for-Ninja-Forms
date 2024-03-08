/**
 * Field Preffered Countries Class
 *
 * @class FieldPrefferedCountries
 * @extends AdminField
 */

import { AdminField } from '../Abstract/AdminField.js'

const $ = jQuery

export class FieldPrefferedCountries extends AdminField {
  /**
   * Constructor
   *
   * @param {string} fieldSelector
   */
  constructor (fieldSelector) {
    super(fieldSelector)

    this.fieldSelector = fieldSelector
    this.$field = this.findField()
  }

  /**
   * Init getter without setter to
   * avoid changing field selector
   */
  get fieldSelector () {
    return this.fieldSelector
  }

  /**
   * Error Message if option inside field was not found
   *
   * @return {string}
   */
  getErrorOptionNotFound () {
    return 'FieldPrefferedCountries: option value is not found.'
  }
}
