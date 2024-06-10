<script id="tmpl-nf-edit-setting-sortable-list" type="text/template">
    <label for="{{{ data.name }}}" class="nf-sortable-list">{{{ data.label }}} {{{ data.renderTooltip() }}}
		<div class="test-wrapper">
			<div class="test">
				<ul id="{{{ data.name }}}" class="setting sortable-list">
					<#
					_.each( data.options, function( option ) {
						#>
						<li data-value="{{{ option.value }}}">{{{ option.label }}}</li>
						<#
					} );
					#>
				</ul>
			</div>
		</div>
    </label>
</script>
