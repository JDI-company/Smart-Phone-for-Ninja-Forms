/**
 * Class to work with Smart Phone Number Input in DOM.
 *
 * @since 1.2.0
 */

import intlTelInputWithUtils from 'intl-tel-input/build/js/intlTelInputWithUtils.js'
import { IntlTelInputInitializer } from './ITIInitializer.js'
import { SPNValidation } from './SPNValidation.js'
import $ from 'jquery'

/**
 * Class representing SPNInput functionality.
 */
class SPNInput {
  /**
   * Initialize SPNInput instance and listen to the events.
   */
  init () {
    this._listenTo(Backbone.Radio.channel('form'), 'render:view', this.initInputOnFormLoad)
    this._listenTo(Backbone.Radio.channel('form'), 'render:view', this.initAndUseIpLookUp)
    this._listenTo(Backbone.Radio.channel('form'), 'render:view', this.initInputValidationOnFormLoad)
    this._listenTo(Backbone.Radio.channel('forms'), 'submit:response', this._initInputOnFormSubmit)
    nfRadio.channel('nfMP').on('change:part', this.initInputOnChangePage)
    nfRadio.channel('nfMP').on('change:part', this.initAndUseIpLookUp)
    this._listenTo(Backbone.Radio.channel('fields'), 'change:model', this.initInputOnConditionalLogic)
    this._listenTo(Backbone.Radio.channel('submit'), 'validate:field', this.ITIValidationOnFormSubmit)
  }

  /**
   * Initialize input when page was changed (multistep)
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initInputOnConditionalLogic (fieldModel) {
    if ('visible' in fieldModel.changed && fieldModel.changed.visible === true) {
      const parentElementId = '#nf-form-' + fieldModel.attributes.formID + '-cont'

      // Initialize intlTelInput on the parent element
      /* eslint-disable no-new */
      new IntlTelInputInitializer(parentElementId).init()
    }
  }

  /**
   * Initialize IP Lookup when form is loaded.
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initAndUseIpLookUp (model) {
    const itiInitializer = new IntlTelInputInitializer()

    let $input = $(model.el).find('.spn-container input[type="tel"]')

    if($input.length <= 0 && model.hasOwnProperty('formModel')) {
      // For Ninja Forms Multi Parts
      $input = $('#nf-form-' + model.formModel.id + '-cont').find('.spn-container input[type="tel"]');
    }

    if($input.length <= 0) {
      return;
    }

    const data = itiInitializer.getIpLookUp($input)

    data(function (country) {
      const inputElement = document.querySelector('.iti__tel-input')
      const itiInstance = intlTelInputWithUtils.getInstance(inputElement)
      itiInstance.setCountry(country)
    }, function () {
      console.error('Failed to retrieve country information')
    })
  }

  /**
   * Initialize input when page was changed (multistep)
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initInputOnChangePage (model) {
    const parentElementId = '#nf-form-' + model.formModel.id + '-cont'

    // Initialize intlTelInput on the parent element
    /* eslint-disable no-new */
    new IntlTelInputInitializer(parentElementId).init()
  }

  /**
   * Initialize input elements when form is loaded.
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initInputOnFormLoad (model) {
    // Get the parent element of the model's view
    const parentElementId = model.el

    // Initialize intlTelInput on the parent element
    /* eslint-disable no-new */
    new IntlTelInputInitializer(parentElementId).init()
  }

  /**
   * Initialize input validation when form is loaded.
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initInputValidationOnFormLoad (model) {
    // Get the parent element of the model's view
    const $input = $(model.el).find('.spn-container input[type="tel"]')

    // Init input filter on keyboard
    SPNValidation.initInputFilter($input)
  }

  /**
   * International Telephone Input validation on form submits
   *
   * @param {Backbone.Model} model - Ninja Forms Model.
   */
  ITIValidationOnFormSubmit (model) {
    SPNValidation.ITIValidation(model)
  }

  /**
   * Initialize input elements when form is submitted
   * We are starting Mutation Observer when user submits form
   * Then, if no errors were found we are looking for the initiator
   * It's a tag of the target mutation. When we get NF Wrapper
   * we call IntlTelInputInitializer class.
   *
   * @param {jQuery} $parentElement - The parent element of the form input.
   * @private
   */
  _initInputOnFormSubmit (response) {
    if (response.errors.length > 0) {
      return
    }

    const data = response.data
    const targetNode = document.body
    const initiator = 'NF-FIELDS-WRAP'
    const _this = this

    const observer = new MutationObserver(function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          if (mutation.target.tagName === initiator) {
            const $parentElement = _this._getNFNode(data.form_id)
            if ($parentElement) {
              /* eslint-disable no-new */
              new IntlTelInputInitializer($parentElement).init()
            }

            // Stop the observer
            observer.disconnect()
          }
        }
      }
    })

    const config = { childList: true, subtree: true }
    observer.observe(targetNode, config)
  }

  /**
   * Get Ninja Forms Node (the main wrapper)
   * @param {string} formID Ninja Form ID
   * @returns jQuery
   * @private
   */
  _getNFNode (formID) {
    return $(`#nf-form-${formID}-cont`)
  }

  /**
   * Start listening to events on the given channel.
   * @param {Backbone.Radio.Channel} channel - The channel to listen to.
   * @param {string} event - The event to listen for.
   * @param {Function} callback - The callback to execute when the event is triggered.
   * @private
   */
  _listenTo (channel, event, callback) {
    channel.on(event, callback.bind(this))
  }
}

/**
 * SPNInput export
 * @type {SPNInput}
 */
export { SPNInput }
