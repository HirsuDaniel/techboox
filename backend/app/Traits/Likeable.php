<?php

namespace App\Traits;

use App\Models\Like;
use Illuminate\Support\Facades\Auth; 

trait Likeable
{
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function like()
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            // Check if the user has already liked the post
            if (!$this->isLiked()) {
                // Create a new Like instance with the user_id
                $like = new Like(['user_id' => Auth::id()]);
                // Save the like to the database by associating it with the post
                $this->likes()->save($like);
            }
        } else {
            // Handle unauthenticated user (optional)
            // For example, you can throw an exception or return an error response
            // throw new \Exception('User is not authenticated');
            return false; // Indicate that like action failed
        }
    }

    public function unlike()
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            // Find and delete the like record for the current user
            $this->likes()->where('user_id', Auth::id())->delete();
        } else {
            // Handle unauthenticated user (optional)
            // For example, you can throw an exception or return an error response
            // throw new \Exception('User is not authenticated');
            return false; // Indicate that unlike action failed
        }
    }

    public function isLiked()
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            // Check if there's a like record for the current user
            return $this->likes()->where('user_id', Auth::id())->exists();
        } else {
            // Handle unauthenticated user (optional)
            // For example, you can throw an exception or return an error response
            // throw new \Exception('User is not authenticated');
            return false; // Indicate that user is not authenticated
        }
    }
    
}