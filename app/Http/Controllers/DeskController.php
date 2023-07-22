<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeskRequest;
use App\Http\Requests\UpdateDeskRequest;
use App\Http\Resources\DeskResource;
use App\Models\Desk;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DeskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return DeskResource::collection(Desk::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeskRequest $request): DeskResource
    {
        $desk = Desk::create($request->validated());

        return new DeskResource($desk);
    }

    /**
     * Display the specified resource.
     */
    public function show(Desk $desk): DeskResource
    {
        return new DeskResource($desk->load('categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeskRequest $request, Desk $desk): DeskResource
    {
        $desk->update($request->validated());

        return new DeskResource($desk->load('categories'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Desk $desk): ?bool
    {
        return $desk->delete();
    }
}
