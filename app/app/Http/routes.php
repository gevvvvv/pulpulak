<?php

Route::get('/',function(){
    return response()->view('home');
});

Route::get('locations/nearest', 'LocationController@nearest');
Route::resource('locations', 'LocationController');
Route::resource('locations.reports', 'LocationReportController');