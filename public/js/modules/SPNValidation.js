/**
 * Class to validate Smart Phone Number Input
 *
 * @since 1.3.0
 */

import $ from 'jquery'

class SPNValidation {
  /**
   * Static method to delete non-numeric and non-plus symbols from phone number input fields.
   * This method is bound to the 'nfFormReady' event, ensuring it runs when Ninja Forms are ready.
   *
   * @param {jQuery} $input - Input element.
   */
  static initInputFilter ($input) {
    if (!$input) {
      return
    }

    // Attach an 'input' event listener on SPN $input inside the NF form
    $input.on('input', function () {
      // Get the current value of the input field
      const currentValue = $(this).val()

      // Remove all non-numeric and non-plus symbols from the current value
      const sanitizedValue = currentValue.replace(/[^\d+]/g, '')

      // Set the input field value to the sanitized value
      $(this).val(sanitizedValue)
    })
  }

  /**
   * International Telephone Input validation on form submits
   *
   * @param {Object} model - Ninja Forms Model.
   * @see https://github.com/jackocnr/intl-tel-input#utilities-script
   */
  static ITIValidation (model) {
    if (!model.attributes.element_templates.includes('spn')) {
      return
    }

    // Get the parent element of the input field
    const $parentElement = $('#nf-form-' + model.attributes.formID + '-cont')

    // Find the input field within the parent element
    const $input = $parentElement.find('.spn-container input[type="tel"]')
    const ITI = window.intlTelInputGlobals.getInstance($input[0])

    // Define an error map for different validation errors ['Invalid number', 'Invalid country code', 'Too short', 'Too long', 'Invalid number']
    // TODO: Move error map to Ninja Forms UI Editor
    const errorMap = ['Invalid number', 'Invalid number', 'Invalid number', 'Invalid number', 'Invalid number']
    const validationType = $input.attr('data-validation-type')
    let isError

    // Perform validation based on the type of validation
    if (validationType === 'precise') {
      isError = !ITI.isValidNumber()
    } else {
      isError = !ITI.isPossibleNumber()
    }

    function removeError () {
      Backbone.Radio.channel('fields').request('remove:error', model.get('id'), 'spn-field-error')
    }

    if (isError) {
      // Add Error to Model
      const errorCode = ITI.getValidationError()
      const errorText = errorMap[errorCode]

      Backbone.Radio.channel('fields').request('add:error', model.get('id'), 'spn-field-error', errorText)

      $input.one('change', removeError)
    } else {
      // Remove Error from Model
      removeError()
    }
  }
}

// Initialize SPNValidation when the script is loaded
export { SPNValidation }
