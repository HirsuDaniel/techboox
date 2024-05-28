<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth; 
use App\Models\Tag;

class PostsController extends Controller
{
    public function index(){

        if (Auth::check() && Auth::user()->surveyResponses()->exists()) {
            return $this->filterPosts($request);
        } else {
            // If the user hasn't submitted survey responses, return all posts
            $posts = Post::with('user', 'tags')->get();
            return response()->json($posts);
        }
    }

    public function store(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user(); // Retrieve the authenticated user
            
            // Validate request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'tags' => 'array',
            ]);

            // Create the post
            $post = new Post();
            $post->title = $validatedData['title'];
            $post->content = $validatedData['content'];
            $post->user_id = $user->id; // Assign the authenticated user's ID to the post
            $post->save();

            // Attach tags to the post
            if (isset($validatedData['tags'])) {
                $tags = Tag::whereIn('id', $validatedData['tags'])->get();
                $post->tags()->sync($tags);
            }
            
            return response()->json($post->load('tags'), 201);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function like(Post $post)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if (!$post->likes()->where('user_id', $user->id)->exists()) {
                $post->likes()->create(['user_id' => $user->id]);
                $post->increment('likes_count'); // Increment likes count
            }
            return response()->json(['message' => 'Post liked successfully']);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function unlike(Post $post)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $post->likes()->where('user_id', $user->id)->delete();
            $post->decrement('likes_count'); // Decrement likes count
            return response()->json(['message' => 'Post unliked successfully']);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getAllTags(){

        $tags = Tag::all();

        return response()->json($tags);

    }

    public function createTag(Request $request){
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:tags'
        ]);

        $tagNames = explode(',', $validatedData['name']); 

        $tag = Tag::create($validatedData);

        return response()->json($tag, 201);
    }

    public function filterPosts(Request $request){

        $userResponses = Auth::user()->surveyResponses()->pluck('response', 'survey_question_id')->toArray();

        $filteredPosts = Post::whereHas('tags', function ($query) use ($userResponses) {
            foreach ($userResponses as $questionId => $response) {
                // Customize this condition based on your survey logic
                // For example, if the response is 'Yes', filter posts with a specific tag
                if ($response === 'Yes') {
                    $query->whereHas('questions', function ($q) use ($questionId) {
                        $q->where('id', $questionId);
                    });
                }
            }
        })->with('user', 'tags')->get();

        return response()->json($filteredPosts);
    }
}
