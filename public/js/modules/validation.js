/**
 * SPNValidation class responsible for handling Smart Phone Number input validation.
 */
class SPNValidation {
  /**
   * Static method to delete non-numeric and non-plus symbols from phone number input fields.
   * This method is bound to the 'nfFormReady' event, ensuring it runs when Ninja Forms are ready.
   */
  static deleteSymbols () {
    // Attach an event listener for the 'nfFormReady' event
    jQuery(document).on('nfFormReady', function () {
      // Attach an 'input' event listener to all input fields of type 'tel' within Ninja Forms
      jQuery('.nf-form-wrap input[type=tel]').on('input', function () {
        // Get the current value of the input field
        const currentValue = jQuery(this).val()

        // Remove all non-numeric and non-plus symbols from the current value
        const sanitizedValue = currentValue.replace(/[^\d+]/g, '')

        // Set the input field value to the sanitized value
        jQuery(this).val(sanitizedValue)
      })
    })
  }

  /**
   * Static method to initialize SPNValidation by calling the deleteSymbols method.
   */
  static init () {
    SPNValidation.deleteSymbols()
  }
}

// Initialize SPNValidation when the script is loaded
SPNValidation.init()
