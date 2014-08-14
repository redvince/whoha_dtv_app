<?php
/* Codeigniter View: image_view.php
*  Author: Vincent Redmond
*  Date : 2014/07/30
*/
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ($index == TRUE)
{
	$message = "Incorrect Usage of Web API.</a>";
	show_error($message, 405);
}
else
{

	echo $records;
}
/* End of file image_view.php */
/* Location: ./application/views/image_view.php */
