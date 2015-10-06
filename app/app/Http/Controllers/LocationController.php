<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Location;
use Illuminate\Support\Facades\Input;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lat = Input::get('lat');
        $lon = Input::get('lon');

        $locations = Location::getNearbyLocations($lat, $lon);

        return response()->json($locations);
    }

    /**
     * Display the nearest specified resource based on geography.
     *
     * @return \Illuminate\Http\Response
     */
    public function nearest()
    {
        $lat = Input::get('lat');
        $lon = Input::get('lon');

        $location = Location::getNearestLocation($lat, $lon);
        return response()->json($location);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $address = $request->input('address');
        $name = $request->input('name');
        $description = $request->input('description');
        $udid = $request->input('udid');

        $location = new Location();
        $location->lat = $lat;
        $location->lon = $lon;
        $location->name = $name;
        $location->address = $address;
        $location->description = $description;
        $location->udid = $udid;
        $location->save();

        if ($request->hasFile('image')) {
            $path = public_path() . DIRECTORY_SEPARATOR . 'location_images' . DIRECTORY_SEPARATOR . $location->id;
            $request->file('image')->move($path, 'image.jpg');
        }



    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
