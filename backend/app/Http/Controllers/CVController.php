<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CV;
use Illuminate\Support\Facades\Auth; 

class CVController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'personal_details' => 'nullable|array',
            'experiences' => 'nullable|array',
            'education' => 'nullable|array',
            'skills' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Create a new CV instance with validated data
        $cv = new CV([
            'personal_details' => $validatedData['personal_details'] ?? [],
            'experiences' => $validatedData['experiences'] ?? [],
            'education' => $validatedData['education'] ?? [],
            'skills' => $validatedData['skills'] ?? [],
        ]);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('images'), $imageName);
            $cv->image = $imageName;
        }

        // Associate the CV with the authenticated user
        $cv->user_id = auth()->id();
        $cv->save();

        return response()->json(['message' => 'CV created successfully'], 201);
    }

    public function show($id){

        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $cv = $user->cvs()->findOrFail($id);
            return response()->json($cv);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'CV not found'], 404);
        }
    }
}
