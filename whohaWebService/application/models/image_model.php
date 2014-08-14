<?php 
/* Codeigniter Model Class: image_model.php
*  Author: Vincent Redmond
*  Date : 2014/07/30
*/
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Image_model extends CI_Model {

	function __construct()
	{
		parent::__construct();
	}
	//function to query whoha_images table in database
	public function get_big_kids_image_data()
	{
		$sql = "SELECT * FROM `whoha_images` WHERE difficulty = 'Adult' OR difficulty = 'Both'";

		$query = $this->db->query($sql);
		
		
		return $query->result();
	}
	//function to query whoha_images table in database
	public function get_kids_image_data()
	{
		
		$sql = "SELECT * FROM `whoha_images` WHERE difficulty = 'Kids' OR difficulty = 'Both'";

		$query = $this->db->query($sql);
		
		return $query->result_array();
	}
}
/* End of file image_model.php */
/* Location: ./application/models/image_model.php */
