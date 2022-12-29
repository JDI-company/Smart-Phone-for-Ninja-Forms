<?php
/**
 * The admin builder templates functionality of the plugin.
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/admin/
 */

class SPN_Builder_Templates {

	protected $templates_path = __DIR__ . '/templates';

	/**
	 * Connect templates
	 * @since 1.0.0
	 *
	 * @param string    $template_name  Name for template to connect
	 * @access private
	*/

	private function require_template( $template_name ) {

		require_once "{$this->templates_path}/{$template_name}.html.php";

	}

	/**
	 * Add multiple select to Ninja Forms
	 * @since 1.0.0
	 *
	 * @access public
	*/
	public function add_templates() {

		$this->require_template( 'select-multiple' );

	}

}
