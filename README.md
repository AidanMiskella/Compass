# BlanccoCompassApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## How to run

To run this project use `ng serve`, to test a physical device, you can serve the project on a local network using `--host [IP Address]`, to run this on an iOS device, you must use a secure network using `--ssl true`

## Brief overview

Created two components, top bar component and compass component

After clicking the button "Get Started", iOS devices will ask for permmission to use Device Orientation Event details

After getting the device orientation details, the rotation is calculated and the compass rotates

Based on the device orientation details, clicking on text-to-speech button will tell users which direction they are facing

## Challenges and solutions

Firstly, I tried to use the GeoLocation API which can access a compass heading property. I believe that this is no longer supported by browsers. I then searched for another API which could access orientation details. I found Device Orientation, this gave me access to some of the properties I needed.

Another challenge that I faced was finding true north on the user device. Instead the users north value, is the direction they are facing during initialization.
