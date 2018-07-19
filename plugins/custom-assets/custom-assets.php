<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

/**
 * Class CustomCSSPlugin
 * @package Grav\Plugin
 */
class CustomAssetsPlugin extends Plugin
{
    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0],
            'onPageInitialized'    => ['onPageInitialized', 0],
        ];
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized()
    {
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            return;
        }

        $this->enable([
            'onAssetsInitialized' => ['onAssetsInitialized', 0]
        ]);
    }

    public function onAssetsInitialized()
    {
        $this->grav['assets']->addInlineCss($this->config->get('plugins.custom-assets.css_inline'));

        foreach($this->config->get('plugins.custom-assets.css_files', []) as $file) {
            $this->grav['assets']->addCss($file['path'], isset($file['priority']) ? $file['priority'] : null);
        }
    }
    
           
    public function onPageInitialized()
    {
            if ($this->grav['uri']->path() === '/admin/plugins/custom-assets') {
            $this->grav['assets']->addJs('plugin://custom-assets/js/autocomplete.js', ['loading' => 'defer']);
            $this->grav['assets']->addCss('plugin://custom-assets/css/autocomplete.css');
            $this->grav['assets']->addJs('plugin://custom-assets/js/app.js', ['loading' => 'defer']);
        }
    }
}

