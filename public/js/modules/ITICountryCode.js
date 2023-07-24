/**
 * Class to synchronize the International Telephone Input
 * country code with Ninja Forms & SPN Input
 *
 * @resolve https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/1
 * @since 1.2.0
 */

class ITICountryCode {
  /**
   * Constructor method to initialize class
   */
  constructor () {
    this.$phoneHidden = null
  }

  /**
   * Method to initialize the class
   */
  syncWithSPN () {
    // Listen to the 'change:modelValue' event on the 'fields' channel
    this._listenTo(Backbone.Radio.channel('fields'), 'change:modelValue', this._syncHiddenInput)
    // Listen to the 'before:submit' event on the 'fields' channel
    this._listenTo(Backbone.Radio.channel('fields'), 'before:submit', this._submitNewPhoneNumber)
  }

  /**
   * Method to sync phone number
   * @param {Backbone.Model} model - Backbone Model
   * @private
   */
  _syncHiddenInput (model) {
    // Check if the model type is 'spn' and the value is not empty and a valid number
    if (model.get('type') === 'spn' && model.get('value') !== '' && !isNaN(Number(model.get('value')))) {
      const modelID = model.get('id')

      // Get the phone input element and the wrapper element
      const $phone = jQuery('#nf-field-' + modelID)
      const $wrapper = $phone.parents('nf-field')

      // Get the hidden input element for the phone number
      this.$phoneHidden = $wrapper.find('#nf-field-' + modelID + '-hidden')

      // Extract the country code from the selected flag and update the hidden input value
      const countryCode = $wrapper.find('.iti__selected-flag').attr('title').match(/[+\d]+/g).join('')
      this.$phoneHidden.val(countryCode + $phone.val())
    }
  }

  /**
   * Method to submit phone number with country code in the backend
   * It replaces "view" input value with "hidden" input
   *
   * @param {Backbone.Model} model - Backbone Model
   * @private
   */
  _submitNewPhoneNumber (model) {
    // Check if the model type is 'spn' and update its value with the hidden input value
    if (model.get('type') === 'spn') {
      model.set('value', this.$phoneHidden.val())
    }
  }

  /**
   * Method to start listening to events.
   * It uses to prevent extending Marionette
   *
   * @param {Backbone.Radio.Channel} channel - Channel to listen to
   * @param {string} event - Event to listen for
   * @param {Function} callback - Callback to execute when event is triggered
   * @private
   */
  _listenTo (channel, event, callback) {
    channel.on(event, callback.bind(this))
  }
}

export { ITICountryCode }
