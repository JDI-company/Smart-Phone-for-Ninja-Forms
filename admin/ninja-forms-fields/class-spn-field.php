<?php
/**
 * The admin-field functionality of the plugin.
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/admin
 */

class SPN_Field extends NF_Fields_Phone {

	protected $_name      = 'spn';
	protected $_section   = 'userinfo'; // section in backend
	protected $_type      = 'phone'; // field type
	protected $_templates = 'spn'; // template; it's possible to create custom field templates
	protected $_icon      = 'phone';

	protected $_settings_exclude = array( 'mask' );

	public function __construct() {
		parent::__construct();

		$this->_nicename = __( 'Smart Phone', 'ninja-forms-spn-addon' );

		$this->add_options();

		$this->_settings['personally_identifiable']['value'] = '1';
	}

	/**
	 * Add new fields
	 *
	 * @since    1.0.0
	 */
	protected function add_options() {

		$countries = new Ninja_Forms_Spn_Addon_Countries_Handler();
		$countries = $countries->get_countries( true, array( 'dialCode', 'priority', 'areaCodes' ) );

		$country_selection_options = array();

		foreach ( $countries as $country ) {
			$country_selection_options[] = Ninja_Forms_Spn_Addon_Utils::array_replace_keys(
				$country,
				array(
					'name' => 'label',
					'iso2' => 'value',
				)
			);
		}

		/**
		 * Add toggle Allow IP Lookup
		 * Automatically select the user's current country using an IP lookup.
		 *
		 * @since    1.0.0
		 */
		$this->_settings['allow_ip_lookup'] = array(
			'name'  => 'allow_ip_lookup',
			'type'  => 'toggle',
			'label' => esc_html__( 'Allow IP Lookup', 'ninja-forms-spn-addon' ),
			'width' => 'full',
			'group' => 'restrictions',
			'help'  => esc_html__( 'Automatically select the user\'s current country using an IP lookup.', 'ninja-forms-spn-addon' ),
			'value' => false,
		);

		/**
		 * Add API key from ipinfo.io for IP lookup
		 * Automatically select the user's current country using an IP lookup.
		 *
		 * @since    1.4.0
		 */
		$this->_settings['ip_lookup_api_key'] = array(
			'name'  => 'ip_lookup_api_key',
			'type'  => 'textbox',
			'label' => esc_html__( 'IP Lookup API Key', 'ninja-forms-spn-addon' ),
			'width' => 'full',
			'group' => 'restrictions',
			'help'  => wp_kses_post( __( '<a href="https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/wiki/Increase-limit-of-the-IP-Lookup" target="_blank" rel="noopener">Increase limit of the IP Lookup</a>', 'ninja-forms-spn-addon' ) ),
			'value' => '',
			'deps' => array(
				'allow_ip_lookup' => 1,
			),
		);

		/**
		 * Add toggle Show Selected Dial Code
		 * Display the country dial code next to the selected flag so it's not part of the typed number.
		 * Note that this will disable nationalMode because technically we are dealing with international numbers, but with the dial code separated.
		 *
		 * @since    1.0.0
		 */
		$this->_settings['show_selected_dial_code'] = array(
			'name'  => 'show_selected_dial_code',
			'type'  => 'toggle',
			'label' => esc_html__( 'Show Selected Dial Code', 'ninja-forms-spn-addon' ),
			'width' => 'full',
			'group' => 'restrictions',
			'help'  => wp_kses_post( __( 'Display the country dial code next to the selected flag. Play with this option on <a href="https://intl-tel-input.com/storybook/?path=/docs/intltelinput--separateDialCode" target="_blank" rel="noopener">Storybook</a> (using the React component).', 'ninja-forms-spn-addon' ) ),
			'value' => false,
		);

		/**
		 * Add select Default Country
		 *
		 * @since    1.0.0
		 */
		$this->_settings['default_country'] = array(
			'name'    => 'default_country',
			'type'    => 'select',
			'label'   => esc_html__( 'Default Country', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $country_selection_options,
			'help'    => esc_html__( 'Set the initial country selection by specifying its country code.', 'ninja-forms-spn-addon' ),
			'value'   => 'gb',
		);

		/**
		 * Add multiple select Preferred Countries
		 *
		 * @since    1.0.0
		 */
		$this->_settings['preffered_countries'] = array(
			'name'    => 'preffered_countries',
			'type'    => 'select-multiple',
			'label'   => esc_html__( 'Preffered Countries', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $country_selection_options,
			'help'    => esc_html__( 'Specify the countries to appear at the top of the list.', 'ninja-forms-spn-addon' ),
			'value'   => '',
		);

		/**
		 * Add multiple select Only Countries
		 *
		 * @since    1.0.0
		 */
		$custom_options = array(
			array(
				'label' => 'All',
				'value' => 'all',
			),
			array(
				'label' => 'European countries',
				'value' => 'european',
			),
		);

		$this->_settings['only_countries'] = array(
			'name'    => 'only_countries',
			'type'    => 'select-multiple',
			'label'   => esc_html__( 'Only Countries', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => array_merge( $custom_options, $country_selection_options ),
			'help'    => esc_html__( 'In the dropdown, display only the countries you specify', 'ninja-forms-spn-addon' ),
			'value'   => 'all',
		);

		/**
		 * Add allowDropdown
		 *
		 * @since    1.0.0
		 */
		$this->_settings['allow_dropdown'] = array(
			'name'    => 'allow_dropdown',
			'type'    => 'toggle',
			'label'   => esc_html__( 'Allow Dropdown', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $country_selection_options,
			'help'    => esc_html__( 'Whether or not to allow the dropdown', 'ninja-forms-spn-addon' ),
			'value'   => true,
		);

		/**
		 * Add nationalMode
		 *
		 * @since    1.0.0
		 */
		$this->_settings['national_mode'] = array(
			'name'    => 'national_mode',
			'type'    => 'toggle',
			'label'   => esc_html__( 'National Mode', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $country_selection_options,
			'help'    => esc_html__( 'Allow users to enter national numbers (and not have to think about international dial codes).', 'ninja-forms-spn-addon' ),
			'value'   => true,
		);

		/**
		 * Add autoHideDialCode
		 *
		 * @since    1.0.0
		 */
		$this->_settings['auto_hide_dial_code'] = array(
			'name'  => 'auto_hide_dial_code',
			'type'  => 'toggle',
			'label' => esc_html__( 'Auto Hide Dial Code', 'ninja-forms-spn-addon' ),
			'width' => 'full',
			'group' => 'restrictions',
			'help'  => esc_html__( 'If there is just a dial code in the input: remove it on blur or submit. Requires nationalMode to be set to false', 'ninja-forms-spn-addon' ),
			'value' => true,
		);

		/**
		 * Add excludeCountries
		 *
		 * @since    1.0.0
		 */
		$this->_settings['exclude_countries'] = array(
			'name'    => 'exclude_countries',
			'type'    => 'select-multiple',
			'label'   => esc_html__( 'Exclude Countries', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $country_selection_options,
			'help'    => esc_html__( 'In the dropdown, display all countries except the ones you specify here', 'ninja-forms-spn-addon' ),
			'value'   => '',
		);

		/**
		 * Add Format On Display
		 *
		 * @since    1.0.0
		 */
		$this->_settings['format_on_display'] = array(
			'name'  => 'format_on_display',
			'type'  => 'toggle',
			'label' => esc_html__( 'Format On Display', 'ninja-forms-spn-addon' ),
			'width' => 'full',
			'group' => 'restrictions',
			'help'  => esc_html__( 'In the dropdown, display all countries except the ones you specify here', 'ninja-forms-spn-addon' ),
			'value' => true,
		);

		/**
		 * Add Validation Type
		 *
		 * @since    1.3.0
		 */
		$validation_options = array(
			array(
				'label' => 'Practical (default)',
				'value' => 'practical',
			),
			array(
				'label' => 'Precise (updates every month)',
				'value' => 'precise',
			),
		);

		$validation_help = __(
			'- Practical: Check if the current number is valid based on its length<br>
            - Precise: Check if the current number is valid using precise matching rules for each country/area code.
            Note that these rules change each month for various countries around the world, so you need to be careful to keep the plugin up-to-date else you will start rejecting valid numbers.<br><br>
            <a href="https://intl-tel-input.com/examples/validation.html" target="_blank" rel="noopener">Click to open example</a>',
			'ninja-forms-spn-addon'
		);

		$this->_settings['validation_type'] = array(
			'name'    => 'validation_type',
			'type'    => 'select',
			'label'   => esc_html__( 'Validation Type', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $validation_options,
			'help'    => wp_kses_post( $validation_help ),
		);

				/**
		 * Add Exclude country code from the submission 
		 *
		 * @since    1.3.1
		 */
		$this->_settings['exclude_country_code_from_submission'] = array(
			'name'    => 'exclude_country_code_from_submission',
			'type'    => 'toggle',
			'label'   => esc_html__( 'Exclude country code from the submission', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'advanced',
			'help'    => esc_html__( 'Enable if you want the country code to be removed from the submission', 'ninja-forms-spn-addon' ),
			'value'   => false,
		);
	}
}
