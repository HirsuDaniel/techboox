<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CV;

class CVController extends Controller
{
    public function store(Request $request)
    {
        // Log the incoming request for debugging
        \Log::info('Request Data:', $request->all());

        // Get the input data as arrays
        $personalDetails = $request->input('personal_details');
        $experiences = $request->input('experiences', []);
        $education = $request->input('education', []);
        $skills = $request->input('skills', []);

        // Validate the incoming data
        $request->validate([
            'personal_details' => 'nullable|array',
            'experiences' => 'nullable|array',
            'education' => 'nullable|array',
            'skills' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Create a new CV instance
        $cv = new CV([
            'personal_details' => $personalDetails,
            'experiences' => $experiences,
            'education' => $education,
            'skills' => $skills,
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
}
