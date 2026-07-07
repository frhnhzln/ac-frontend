<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    //register
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
    //login
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        $admin = Admin::where(
            'email',
            $request->email
        )->first();


        if (!$admin || !Hash::check($request->password, $admin->password)) {

            return response()->json([
                'message'=>'Invalid email or password'
            ],401);

        }


        $token = $admin->createToken('admin-token')->plainTextToken;


        return response()->json([
            'message'=>'Login successful',
            'token'=>$token,
            'user'=>$admin
        ]);
    }
    //forgot password
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email'=>'required|email'
        ]);

        $admin = Admin::where(
            'email',
            $request->email
        )->first();

        if(!$admin){

            return response()->json([
                "message"=>"Email not found"
            ],404);

        }

        $token = Str::random(64);

        DB::table('password_reset_tokens')
        ->updateOrInsert(
            [
                'email'=>$request->email
            ],

            [
                'token'=>hash('sha256', $token),
                'created_at'=>now()
            ]
        );

        // later integrate email service here

        return response()->json([
            "message"=>"Reset link generated",
            "url"=>"http://localhost:3000/reset-password/".$token."?email=".$request->email
        ]);
    }
    //reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6'
        ]);


        $reset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();


        if (!$reset) {
            return response()->json([
                'message' => 'Invalid reset request'
            ], 400);
        }


        if ($reset->token !== hash('sha256', $request->token)) {

            return response()->json([
                'message' => 'Invalid token'
            ], 400);

        }


        Admin::where('email', $request->email)
            ->update([
                'password' => Hash::make($request->password)
            ]);


        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();


        return response()->json([
            'message' => 'Password reset successful'
        ]);
    }
}