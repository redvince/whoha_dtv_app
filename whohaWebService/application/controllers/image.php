<?php 
/* Codeigniter Controller Class: image.php
*  Author: Vincent Redmond
*  Date : 2014/07/30
*/
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Image extends CI_Controller {
	
	public function index()
	{
		$data['index'] = TRUE;
		$this->load->view('image_view', $data);
	}
	
	public function get_big_kids_images()
	{
		//loads Image_model
		$this->load->model('Image_model');
	
		$data['records'] = json_encode($this->Image_model->get_big_kids_image_data());
		//if no results in database, shows relevant error message 
		if ($data['records'] == "[]") 
		{   
			$message = 'Database does not contain records. Please try another request.';
			show_error($message, 404);
		}
		else
		{
			
			$data['index'] = FALSE;
			$this->load->view('image_view', $data);
		}
	}

	public function get_kids_images()
	{
		//loads Image_model
		$this->load->model('Image_model');
		//calls function from Image_model, encodes result as JSON, and stores in $data array to be passed to view
		$data['records'] = json_encode($this->Image_model->get_kids_image_data());
		//if no results in database, shows relevant error message 
		if ($data['records'] == "[]") 
		{   
			$message = 'Database does not contain records. Please try another request.';
			show_error($message, 404);
		}
		else
		{
			
			$data['index'] = FALSE;
			$this->load->view('image_view', $data);
		}
	}
}
/* End of file image.php */
/* Location: ./application/controllers/image.php */
