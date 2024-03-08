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
    const errorMap = ['Invalid number', 'Invalid number', 'Invalid number', 'Invalid number', 'Invalid number']
    const errorArea = $('.spn-container .nf-error-custom-field-error')
    const validationType = $input.attr('data-validation-type')
    const num = ITI.getNumber()
    let val

    // Perform validation based on the type of validation
    if (validationType === 'precise') {
      val = ITI.isValidNumber()
    } else {
      val = ITI.isPossibleNumber()
    }

    const ariaRequiredValue = $input.attr('aria-required')

    // Check if the field is required
    if (ariaRequiredValue === true) {
      if (val) {
        // Remove Error from Model
        Backbone.Radio.channel('fields').request('remove:error', model.get('id'), 'custom-field-error')

        errorArea.text('')
      } else {
        // Add Error to Model
        const errorCode = ITI.getValidationError()
        const errorText = errorMap[errorCode]

        Backbone.Radio.channel('fields').request('add:error', model.get('id'), 'custom-field-error', errorText)

        errorArea.html('errorText')
      }
    } else {
      // If the field is not required
      if (val || num === '') {
        // Remove Error from Model
        Backbone.Radio.channel('fields').request('remove:error', model.get('id'), 'custom-field-error')

        errorArea.text('')
      } else {
        // Add Error to Model
        const errorCode = ITI.getValidationError()
        const errorText = errorMap[errorCode]

        Backbone.Radio.channel('fields').request('add:error', model.get('id'), 'custom-field-error', '')

        errorArea.html(errorText)
      }
    }
  }
}

// Initialize SPNValidation when the script is loaded
export { SPNValidation }
