<?php
/**
 * LogErrors v1.0.1
 *
 * This plugin logs not found (404) page errors to the data folder so it can be read with Data Plugin
 *
 * @package     Log Errors
 * @version     1.0.1
 * @link        <https://github.com/hugoaf/grav-plugin-logerrors>
 * @author      Hugo Avila <hugoavila@sitioi.com>
 * @copyright   2015, Hugo Avila
 * @license     <http://opensource.org/licenses/MIT>        MIT
 */

namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\File\File;
use Symfony\Component\Yaml\Yaml;

class CustomPagePlugin extends Plugin
{

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPageNotFound' => ['onPageNotFound', 1],
        ];
    }

    /**
     *  if page not found found saves data
     *
     */
    public function onPageNotFound()
    {
    }
}
