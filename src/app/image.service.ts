import { Injectable } from '@angular/core';
import { S3 } from 'aws-sdk';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private s3: S3;

  public constructor() {
    this.s3 = new S3(env.aws.config);
  }

  public async getNewImageCallback(): Promise<{}> {
    var ids = await this.s3.listObjectsV2({ Bucket: env.aws.photoBucket, Prefix: 'v1/', StartAfter: 'v1/' }).promise();

    var signedUrlOptions = {
      Bucket: env.aws.photoBucket,
      Expires: 60,
      Key: ids.Contents[this.getRandomIndex(ids.Contents.length)].Key
    };

    var signedUrl = await new Promise((resolve, reject) => {
      this.s3.getSignedUrl('getObject', signedUrlOptions, (err, url) => {
        if (err) reject(err)
        else resolve(url)
      });
    });

    return signedUrl;
  }


  private getRandomIndex(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
