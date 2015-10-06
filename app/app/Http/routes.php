<?php

Route::get('locations/nearest', 'LocationController@nearest');
Route::resource('locations', 'LocationController');
Route::resource('locations.reports', 'LocationReportController');