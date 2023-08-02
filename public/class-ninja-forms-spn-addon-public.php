<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/public
 * @author     JDI <yaroslav.borodii@jdi.company>
 */
class Ninja_Forms_Spn_Addon_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ninja-forms-spn-addon-public.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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
			
		wp_enqueue_script( 'intlTelInput', plugin_dir_url( dirname( __FILE__ ) ) . 'node_modules/intl-tel-input/build/js/intlTelInput-jquery.js', array(), '18.1.8', true );
		wp_enqueue_script( 'intlTelInputUtils', plugin_dir_url( dirname( __FILE__ ) ) . 'node_modules/intl-tel-input/build/js/utils.js', array( ), '18.1.8', true );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( dirname( __FILE__ ) ) . 'dist/public/spn-front-main.min.js', array( 'nf-front-end' ), $this->version, true );

	}

	/**
	 * Add templates file path.
	 *
	 * @since    1.1.0
	 */
	public function register_template_path( $paths ) {

		$paths[] = plugin_dir_path( __FILE__ ) . 'ninja-forms-fields/templates/';

		return $paths;

	}

}
