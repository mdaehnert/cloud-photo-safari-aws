import { Component, OnInit } from '@angular/core';
import { S3 } from "aws-sdk";
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cloud-photo-safari-aws';


  public async ngOnInit() {
    var s3 = await new S3(env.aws.config);

    var ids = await s3.listObjectsV2( { Bucket: env.aws.photoBucket }).promise();

    var signedUrlOptions = {
      Bucket: env.aws.photoBucket,
      Expires: 60,
      Key: ids.Contents[0].Key
    };

    var signedUrl = await new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', signedUrlOptions, (err, url) => {
        if (err) reject(err)
        else resolve(url)
      });
    });

    console.log(signedUrl);
  }
}
