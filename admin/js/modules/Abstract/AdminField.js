/**
 * Abstract Class
 *
 * @class AdminField
 */

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
   * 
   * @param {Function} callback 
   */
  onSettingsInit( callback ) {
    const target = document.getElementById('nf-drawer')
    const config = {
      childList: true,
      subtree: true
    }

    // Create an observer instance.
    const observer = new MutationObserver((mutationList, _observer) => {
      if ($(this.fieldSelector).length) {
        const fieldElement = $(this.fieldSelector)[0]

        callback( fieldElement )

        _observer.disconnect()
      }
    })

    observer.observe(target, config)
  }
}
