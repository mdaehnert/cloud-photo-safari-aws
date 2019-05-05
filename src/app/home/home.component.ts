import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

import { S3 } from "aws-sdk";
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private s3: S3;
  @ViewChild('background1') background1: ElementRef;
  @ViewChild('background2') background2: ElementRef;


  public async ngOnInit() {
    this.s3 = await new S3(env.aws.config);

    let timerObservable = timer(0, 10000);
    timerObservable.subscribe(() => this.timerCallback());
  }





    private async timerCallback() {
      var ids = await this.s3.listObjectsV2( { Bucket: env.aws.photoBucket }).promise();

      var signedUrlOptions = {
        Bucket: env.aws.photoBucket,
        Expires: 60,
        Key: ids.Contents[0].Key
      };

      var signedUrl = await new Promise((resolve, reject) => {
        this.s3.getSignedUrl('getObject', signedUrlOptions, (err, url) => {
          if (err) reject(err)
          else resolve(url)
        });
      });

      console.log(signedUrl);

      this.background1.nativeElement.style.backgroundImage = `url('${signedUrl}')`;
    }
}
