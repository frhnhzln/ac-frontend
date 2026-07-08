<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    // Add member
    public function store(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'role' => 'required'
        ]);

        $member = Team::create([
            'team_table_id' => $id,
            'name' => $request->name,
            'phone' => $request->phone,
            'role' => $request->role,
            'status' => 'active'
        ]);

        return response()->json([
            'message' => 'Member added successfully',
            'member' => $member
        ]);
    }

    // Update member
    public function update(Request $request, $id)
    {
        $member = Team::findOrFail($id);

        $member->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Member updated',
            'member' => $member
        ]);
    }

    // Delete member
    public function destroy($id)
    {
        $member = Team::findOrFail($id);

        $member->delete();

        return response()->json([
            'message' => 'Member deleted'
        ]);
    }
}