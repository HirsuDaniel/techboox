<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth; 
use App\Models\Comment;

class CommentsController extends Controller
{

    public function getComments(Post $post){
        $comments = $post->comments()->with('user')->get();

        return response()->json($comments, 200);
    }
    
    public function store(Request $request, Post $post){
        $request->validate([
            'content' => 'required|string|max:255',
        ]);
        
        // Check if the post exists
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Check if the user is authenticated
        $user = Auth::user(); 
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $comment = new Comment();
        $comment->content = $request->content;
        $comment->post_id = $post->id;
        $comment->user_id = $user->id;
        $comment->save();

        return response()->json($comment, 201);
    }
}
