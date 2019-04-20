import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  tomorrow = new Date(2017, 9, 20, 14, 34, 32, 10);

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
