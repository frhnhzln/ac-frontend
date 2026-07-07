<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {

            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:admins',
                'password' => 'required|min:6',
                'role' => 'nullable',
            ]);

            $admin = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role ?? 'admin',
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'Admin registered successfully',
                'admin' => $admin
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }
}