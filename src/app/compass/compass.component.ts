import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss']
})
export class CompassComponent implements OnInit {

  compassStyle: any;
  isIos = (navigator.userAgent.match(/(iPhone)/) && navigator.userAgent.match(/AppleWebKit/));

  constructor() { }

  ngOnInit() {
  }

  onGetStartedClick() {
    this.getPermission()
  }

  getPermission() {
    if (this.isIos) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            alert("iOS Permission Granted")
          } else {
            alert("Not Supported");
          }
        })
        .catch (() => alert("Not Supported"))
    }
  }

  @HostListener('window:deviceorientation', ['$event'])
  getOrientation(event: DeviceOrientationEvent) {
    if (event.alpha) {
      var rotationDegree = Math.abs(event.alpha - 360)
      this.compassStyle = {
        'transform': `translate(-50%, -50%) rotate(${-rotationDegree}deg)`
      }
    }
  }

}
