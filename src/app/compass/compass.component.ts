import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss']
})
export class CompassComponent implements OnInit {

  compassStyle: any;
  currentDirection: string = "North";
  compassAlpha: number = 0

  isIos = (navigator.userAgent.match(/(iPhone)/) && navigator.userAgent.match(/AppleWebKit/));

  constructor() { }

  ngOnInit() {
  }

  // When get started button clicked
  onGetStartedClick() {
    this.getPermission()
  }

  // Get permission for iOS devices
  getPermission() {
    if (this.isIos) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            alert("iOS Permission Granted")
          } else {
            alert("Permission Not Granted");
          }
        })
        .catch (() => alert("Not Supported"))
    }
  }

  // Device orientation listener
  @HostListener('window:deviceorientation', ['$event'])
  getOrientation(event: DeviceOrientationEvent) {
    if (event.alpha) {
      var rotationDegrees = Math.abs(event.alpha - 360)
      this.compassAlpha = event.alpha;
      this.compassStyle = {
        'transform': `translate(-50%, -50%) rotate(${-rotationDegrees}deg)`
      }
    }
  }

  getCompassDirection(): string {
    if (!this.isIos) {
      if (this.compassAlpha <= 45 && this.compassAlpha >= -45) {
        this.currentDirection = "North";
      } else if (this.compassAlpha < 135 && this.compassAlpha > 45) {
        this.currentDirection = "West";
      } else if (this.compassAlpha <= -45 && this.compassAlpha >= -135) {
        this.currentDirection = "East";
      } else {
        this.currentDirection = "South";
      }
    } else {
      if (this.compassAlpha <= 225 && this.compassAlpha >= 135) {
        this.currentDirection = "South";
      } else if (this.compassAlpha < 135 && this.compassAlpha > 45) {
        this.currentDirection = "West";
      } else if (this.compassAlpha <= 315 && this.compassAlpha >= 225) {
        this.currentDirection = "East";
      } else {
        this.currentDirection = "North";
      }
    }

    return this.currentDirection
  }

  textToSpeech() {
    if ('speechSynthesis' in window) {

      var synthesis = window.speechSynthesis;
      var message = "";
    
      var voice = synthesis.getVoices().filter(function(voice) {
        return voice.lang === 'en';
      })[0];

      var utterance = new SpeechSynthesisUtterance(`You are facing ${this.getCompassDirection()}`);
    
      utterance.voice = voice;
      utterance.pitch = 1.5;
      utterance.rate = 1;
      utterance.volume = 0.8;
    
      synthesis.speak(utterance);
    
    } else {
      console.log('Text-to-speech not supported.');
    }
  }

}
