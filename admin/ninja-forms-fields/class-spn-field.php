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
		 * Add toggle Separate Dial Code
		 * Display the country dial code next to the selected flag so it's not part of the typed number.
		 * Note that this will disable nationalMode because technically we are dealing with international numbers, but with the dial code separated.
		 *
		 * @since    1.0.0
		 */
		$this->_settings['separate_dial_code'] = array(
			'name'  => 'separate_dial_code',
			'type'  => 'toggle',
			'label' => esc_html__( 'Separate Dial Code', 'ninja-forms-spn-addon' ),
			'width' => 'full',
			'group' => 'restrictions',
			'help'  => esc_html__( 'Display the country dial code next to the selected flag so it\'s not part of the typed number. Note that this will disable nationalMode because technically we are dealing with international numbers, but with the dial code separated.', 'ninja-forms-spn-addon' ),
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
		 * @since    1.0.0
		 */

		$validation_options = array(
			array(
				'label' => 'Precise',
				'value' => 'precise',
			),
			array(
			'label' => 'Practical',
			'value' => 'practical',
			),
		);

		$this->_settings['validation_type'] = array(
			'name'    => 'validation_type',
			'type'    => 'select',
			'label'   => esc_html__( 'Validation Type', 'ninja-forms-spn-addon' ),
			'width'   => 'full',
			'group'   => 'restrictions',
			'options' => $validation_options,
			'help'    => esc_html__( 'You can choose type of validation', 'ninja-forms-spn-addon' ),
		);



	}
}
