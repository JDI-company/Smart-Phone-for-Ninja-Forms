/**
 * Field Only Countries Class
 *
 * @class FieldOnlyCountries
 * @extends AdminField
 */

import { AdminField } from '../Abstract/AdminField'

export class FieldOnlyCountries extends AdminField {
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
    return 'FieldOnlyCountries: option value is not found.'
  }
}
