/**
 * Field Exclude Countries Class
 *
 * @class FieldExcludeCountries
 * @extends AdminSelectField
 */

import { AdminSelectField } from '../Abstract/AdminSelectField.js'

export class FieldExcludeCountries extends AdminSelectField {
  /**
   * Constructor
   *
   * @param {string} fieldSelector
   */
  constructor (fieldSelector) {
    super(fieldSelector)

    this.fieldSelector = fieldSelector
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
