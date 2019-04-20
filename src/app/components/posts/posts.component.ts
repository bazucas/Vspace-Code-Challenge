import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {Post} from '../../models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  tomorrow = new Date(2017, 9, 20, 14, 34, 32, 10);

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: ToastrService) { }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private allPosts: Post[];
  private submitted = false;
  private postForm = this.formBuilder.group({
    id: [''],
    who: ['', Validators.required],
    date: ['', Validators.required],
    comment: ['', Validators.required]
  });

  ngOnInit() {
    this.postForm.get('id').disable();
  }

  ngOnDestroy(): void  {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private get f() { return this.postForm.controls; }


  updatePost() {

  }

  addPost() {

  }
}
