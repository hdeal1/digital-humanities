<?php

	function generate_easy_password() {

		$adjectives = file('config/adjectives.list');
		$animals = file('config/animals.list');

		$rand_adjective = rand(0, count($adjectives));
		$rand_animal = rand(0, count($animals));
		
		$word_one = ucfirst(trim($adjectives[$rand_adjective]));
		$word_two = ucfirst(trim($animals[$rand_animal]));
		$concat = $word_one . $word_two;

		return $concat;
	}
?>
