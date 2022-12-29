<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/admin
 * @author     JDI <yaroslav.borodii@jdi.company>
 */
class Ninja_Forms_Spn_Addon_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Ninja_Forms_Spn_Addon_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Ninja_Forms_Spn_Addon_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ninja-forms-spn-addon-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Ninja_Forms_Spn_Addon_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Ninja_Forms_Spn_Addon_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( 'intlTelInput', plugin_dir_url( dirname( __FILE__ ) ) . 'vendor/intl-tel-input-master/build/js/intlTelInput-jquery.js', array( 'jquery' ), $this->version, true );
		wp_enqueue_script( 'intlTelInputUtils', plugin_dir_url( dirname( __FILE__ ) ) . 'vendor/intl-tel-input-master/build/js/utils.js', array( 'intlTelInput' ), $this->version, true );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( dirname( __FILE__ ) ) . 'dist/admin/main.min.js', array( 'jquery', 'intlTelInput' ), $this->version, true );

	}

	/**
	 * Register custom fields.
	 *
	 * @since    1.0.0
	 */
	public function register_fields( $actions ) {

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/ninja-forms-fields/class-spn-field.php';

		$actions['spn'] = new SPN_Field();

		return $actions;

	}

	/**
	 * Add templates file path.
	 *
	 * @since    1.0.0
	 */
	public function register_template_path( $paths ) {

		$paths[] = plugin_dir_path( __FILE__ ) . 'ninja-forms-fields/templates/';

		return $paths;

	}
}
