import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('background1') background1: ElementRef;
  @ViewChild('background2') background2: ElementRef;

  public constructor(private imageService: ImageService) { }

  public async ngOnInit() {
    let timerObservable = timer(3000, 100000);
    timerObservable.subscribe(() => {
      this.imageService.getNewImageCallback().then((imageUrl) => {
        this.background1.nativeElement.style.backgroundImage = `url('${imageUrl}')`;
      });
    });
  }

}
