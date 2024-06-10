/**
 * Field Order Country
 *
 * @class FieldCountryOrder
 * @extends AdminField
 */

import { AdminField } from '../Abstract/AdminField.js'
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';

Sortable.mount(new AutoScroll());

const $ = jQuery

export class FieldCountryOrder extends AdminField {
  /**
   * Constructor
   *
   * @param {string} fieldSelector
   */
  constructor (fieldSelector) {
    super(fieldSelector)

    this.fieldSelector = fieldSelector

    this.initSortable()
  }

  /**
   * Init getter without setter to
   * avoid changing field selector
   */
  get fieldSelector () {
    return this.fieldSelector
  }

  initSortable() {
    this.onSettingsInit((fieldElement) => {
      const sortable = Sortable.create(fieldElement, {
        scroll: true,
        forceAutoScrollFallback: true
      })
    })
  }

  /**
   * Error Message if option inside field was not found
   *
   * @return {string}
   */
  getErrorOptionNotFound () {
    return 'FieldCountryOrder: option value is not found.'
  }
}
