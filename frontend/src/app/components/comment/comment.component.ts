import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() postId!: number;
  comments: any[] = [];
  newCommentContent = '';
  private timerSubscription!: Subscription;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.fetchComments();
    // Start polling every 1 minute
    this.timerSubscription = interval(60000).subscribe(() => {
      this.fetchComments();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from timer when component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  fetchComments(): void {
    this.commentService.getComments(this.postId).subscribe(comments => {
      this.comments = comments.map(comment => {
        comment.elapsedTime = this.calculateElapsedTime(comment.created_at);
        return comment;
      });
    });
  }

  submitComment(): void {
    if (!this.newCommentContent.trim()) {
      return;
    }

    this.commentService.createComment(this.postId, this.newCommentContent).subscribe(() => {
      this.newCommentContent = '';
      // Fetch comments again after submission to update the list
      this.fetchComments();
    });
  }

  calculateElapsedTime(createdAt: string): string {
    const createdTimestamp = new Date(createdAt).getTime();
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - createdTimestamp;

    if (timeDifference < 60000) { // Less than 1 minute
      return 'Just now';
    } else if (timeDifference < 3600000) { // Less than 1 hour
      const minutes = Math.floor(timeDifference / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else { // 1 hour or more
      const hours = Math.floor(timeDifference / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  }
}