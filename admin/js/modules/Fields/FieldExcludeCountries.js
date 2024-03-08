/**
 * Field Exclude Countries Class
 *
 * @class FieldExcludeCountries
 * @extends AdminField
 */

import { AdminField } from '../Abstract/AdminField.js'

export class FieldExcludeCountries extends AdminField {
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
    return 'FieldExcludeCountries: option value is not found.'
  }
}
