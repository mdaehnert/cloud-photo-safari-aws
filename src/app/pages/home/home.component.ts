import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { HomeModel } from '../../models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('background1') background1: ElementRef;
  @ViewChild('background2') background2: ElementRef;
  @ViewChild('sleepModeBg') sleepModeBg: ElementRef;

  public constructor(private imageService: ImageService, private homeModel: HomeModel) { }

  public async ngOnInit() {
    this.homeModel.init(this.background1, this.background1, this.background2, this.sleepModeBg);


    let timerObservable = timer(3000, 1000 * 60 * 15); // ms * sec * min
    timerObservable.subscribe(() => {
      this.imageService.getNewImageCallback().then((imageUrl) => {
        this.background1.nativeElement.style.backgroundImage = `url('${imageUrl}')`;
      });
    });
  }

}
