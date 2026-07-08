<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamTable;
use Illuminate\Http\Request;

class TeamTableController extends Controller
{
    // List all teams
    public function index()
    {
        return TeamTable::with('members')->get();
    }

    // Create new team
    public function store(Request $request)
    {
        $request->validate([
            'team_name' => 'required'
        ]);

        $team = TeamTable::create([
            'team_name' => $request->team_name,
            'description' => $request->description
        ]);

        return response()->json([
            'message' => 'Team created successfully',
            'team' => $team
        ]);
    }

    // Show one team
    public function show($id)
    {
        return TeamTable::with('members')->findOrFail($id);
    }

    // Update team
    public function update(Request $request, $id)
    {
        $team = TeamTable::findOrFail($id);

        $team->update([
            'team_name' => $request->team_name,
            'description' => $request->description
        ]);

        return response()->json([
            'message' => 'Team updated',
            'team' => $team
        ]);
    }

    // Delete team
    public function destroy($id)
    {
        $team = TeamTable::findOrFail($id);

        $team->delete();

        return response()->json([
            'message' => 'Team deleted'
        ]);
    }
}