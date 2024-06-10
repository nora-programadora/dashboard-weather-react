# Documentation

## Introduction

This project is an interactive dashboard that displays current weather information and forecasts for the next 5 days. It uses the OpenWeatherMap API to fetch real-time weather data. The application is built using React and various complementary libraries such as Chart.js and react-datepicker to display charts and select dates, respectively.

## Aproach taken

The application is divided into modular components to enhance code readability and maintenance. A user-centered approach has been adopted, ensuring that the interface is user-friendly and accessible to all users.

## Instalation

To install the necessary dependencies for this project, you can run the following command in the terminal at the root of your project:

`npm install`

This will install all the dependencies specified in the package.json file, including the necessary libraries like React, Chart.js, and react-datepicker, among others. Once the installation is complete, you'll be ready to run your application.

### Commands of necessary installations.

In any case, I share with you the commands that I use for the necessary installations.

`npm install react-chartjs-2 chart.js`

`npm install dayjs`

`npm install styled-components`

`npm install react-datepicker`

`npm install --save-dev jest @testing-library/react @testing-library/jest-dom --legacy-peer-deps`

## To run the project in local

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## To run the Jest tests

I included two unit tests made with jest, one in App.test.js and the other in src/DateRangerPicker.text.js, which you can run with the following command on your local.

### `npm test`

## How works

First you must find a city
![alt text](image-1.png)

Then you can filter the following days that you want to know the weather
![alt text](image-2.png)

You can also filter the lowest and highest temperatures of certain dates
![alt text](image-3.png)

![alt text](image-4.png)
