import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommentService } from './../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './../../services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Comment } from './../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postId: string;
  post: Post;
  comments: Array<Comment>;
  comment: Comment = new Comment();
  likedComments: Array<string> = new Array<string>();
  mapUserNames: Map<string,string>;

  constructor(private userService: UserService ,private authService: AuthService, private messageService: MessageService, private activatedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) { }

  ngOnInit(): void {

    const postId: string = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostByIdFromBackend(postId).subscribe(
      (data) => this.post = data,
      (err) => console.log(err.message)
      )

      this.getCommentsByPost();
      this.initUserNames();

  }

  initUserNames(){
    this.mapUserNames = new Map();
    this.userService.getUsersFromBackend().subscribe(
      (users) => {
        let index : number;
        let value: string;
        let fullName: string;
        let firstName: string;
        for (let user of users){
          index = Array.from(this.mapUserNames.keys()).indexOf(user._id)
          if ( index == -1 ){
            firstName = user.firstName.toLowerCase();
            fullName= user.lastName.toUpperCase()+ ' ' + firstName.charAt(0).toUpperCase() + firstName.slice(1);
            this.mapUserNames.set(user._id,fullName);
          }
        }
      }
    )
  }

  getUserName(userId: string){
    return this.mapUserNames.get(userId);
  }
  getCommentsByPost() {
    this.commentService.getCommentsByPostFromBackend(this.postId).subscribe(
      (data) => {
        this.comments = data;
        console.log(data);


      },
      (err) => console.log(err.message)
    );
  }

  onAddComment() {
    // this.commentService.createComment().subscribe(
    //   (data) => {
    //     this.comments = data;
    //     console.log(data);


    //   },
    //   (err) => console.log(err.message)
    // );
    this.comment.userId = this.authService.user._id;
    this.comment.postId = this.postId;

    this.commentService.createComment(this.comment).subscribe(
      (data) => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment Added Successfuly' });
        this.comment.message ="";
        this.getCommentsByPost();


      },
      (err) => console.log(err.message)

    );

    console.log(this.comment);
  }

  onLikeComment(comment: Comment) {
    if (!this.isLiked(comment)) {
      comment.rating += 1;
      this.commentService.updateComment(comment).subscribe(
        (data) => {
          this.likedComments.push(comment._id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment Liked Successfuly' });
        },
        (err) => console.log(err.message)

      );
    }
  }

  onDislikeComment(comment: Comment) {
    if (this.isLiked(comment)) {
      comment.rating -= 1;
      this.commentService.updateComment(comment).subscribe(
        (data) => {
          this.removeFromLikedComments(comment._id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment Disliked Successfuly' });
        },
        (err) => console.log(err.message)

      );
    }
  }

  removeFromLikedComments(commentId: string): boolean {
    const index = this.likedComments.indexOf(commentId, 0);
    if (index > -1) {
      this.likedComments.splice(index, 1);
      return true;
    }
    return false;
  }

  isIn(commentId: string) {
    let liked: boolean = false;
    for (let likedComment of this.likedComments) {
      if (commentId == likedComment) {
        liked = true;
        return liked;
      }
    }
    return liked;
  }

  isLiked(comment: Comment) {
    if (this.isIn(comment._id)) return true;
    return false;
  }

  topComment(comment: Comment): boolean {
    if (comment.rating >= 5) {
      return true;
    }
    return false;
  }



}
