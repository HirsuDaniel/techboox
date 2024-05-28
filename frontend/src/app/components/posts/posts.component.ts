import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Subscription, interval } from 'rxjs';
import { LikesService } from '../../services/likes.service';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  postData = { title: '', content: '', name: ''};
  posts: any[] = [];
  timerSubscription: Subscription | undefined;
  hover = false; 

  constructor(private postService: PostService, private likeService: LikesService, private tagService: TagService) { }

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts when component initializes

    // Schedule periodic updates every minute
    this.timerSubscription = interval(60000).subscribe(() => {
      this.updateTimestamps();
    });
    
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  createPost(): void {
    // First, split tag names into an array
    const tagNames = this.postData.name.split(',');
    
    // Next, create tags one by one
    const createdTagIds: number[] = [];
    for (const name of tagNames) {
      this.tagService.createTag({ name }).subscribe(
        (tagResponse: any) => {
          console.log('Tag created:', tagResponse);
          createdTagIds.push(tagResponse.id);
  
          // If all tags are created, proceed to create the post
          if (createdTagIds.length === tagNames.length) {
            this.postService.createPost({ 
              title: this.postData.title, 
              content: this.postData.content, 
              tags: createdTagIds
            }).subscribe(
              (postResponse: any) => {
                console.log('Post created:', postResponse);
                this.posts.push(postResponse);
                this.postData = { title: '', content: '', name: '' }; // Clear postData
              },
              (error) => {
                console.error('Error creating post:', error);
                // Handle post creation error
              }
            );
          }
        },
        (error) => {
          console.error('Error creating tag:', error);
          // Handle tag creation error
        }
      );
    }
  }
  
  updateTimestamps(): void {
    this.posts.forEach(post => {
      const createdTimestamp = new Date(post.created_at).getTime();
      const currentTimestamp = Date.now();
      const timeDifference = currentTimestamp - createdTimestamp;
      let elapsedTime: string;

      if (timeDifference < 60000) {
        elapsedTime = 'Just now';
      } else if (timeDifference < 3600000) {
        const minutes = Math.floor(timeDifference / 60000);
        elapsedTime = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        const hours = Math.floor(timeDifference / 3600000);
        elapsedTime = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      }

      post.elapsedTime = elapsedTime; // Update the elapsedTime property
    });
  }

  toggleLike(postId: number): void {
    const postIndex = this.posts.findIndex(post => post.id === postId);
    const post = this.posts[postIndex];
  
    if (post.isLiked) {
      this.likeService.unlikePost(postId).subscribe(() => {
        post.isLiked = false;
        post.likes_count--; // Decrement likes_count for the specific post
        this.updateLocalStorage(post); // Update local storage after unliking
      }, error => {
        console.error(error);
        // Handle unlike error
      });
    } else {
      this.likeService.likePost(postId).subscribe(() => {
        post.isLiked = true;
        post.likes_count++; // Increment likes_count for the specific post
        this.updateLocalStorage(post); // Update local storage after liking
      }, error => {
        console.error(error);
        // Handle like error
      });
    }
  }
  
  updateLocalStorage(post: any): void {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    likedPosts[post.id] = post.isLiked;
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }
  
  fetchPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      this.posts = posts.map(post => ({
        ...post,
        likes_count: post.likes_count || 0, // Initialize likes_count from backend
        isLiked: likedPosts[post.id] || false // Initialize isLiked from local storage
      }));
      this.updateTimestamps(); // Update timestamps immediately after fetching posts
    });
  }
}