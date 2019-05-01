import { Component, OnInit } from '@angular/core';
import { S3 } from "aws-sdk";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cloud-photo-safari-aws';

  constructor() {
    console.log(123);
  }

  public ngOnInit() {
    var x = new S3().getSignedUrl('GetObject', {Bucket: 'foo', Key: 'bar'});
    console.log(x);
  }
}
