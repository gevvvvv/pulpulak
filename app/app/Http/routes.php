<?php

Route::get('locations/nearby', 'LocationController@nearby');
Route::resource('locations', 'LocationController');
Route::resource('locations.reports', 'LocationReportController');