# E-commerce app with Next.js
A hybrid Next.js dummy e-commerce application created by using Static Generation for most pages and Server Side Rendering for others.
  
> Live demo coming soon

## Table of Contents
* [General Info](#general-information)
* [Challenges](#challenges)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
I wanted to dive deeper into the React ecosystem and building a basic e-commerce app seemed like a good way to do it. I was considering making the app with either Next or Gatsby but I decided to start learning Next due to the more versatile nature of Next, having the option to implement SSR as well as static generation. I used many new to me technologies in this project - Next, next-auth, redux-toolkit, redux-persist, customized Bootstrap, and all of that made the development process super interesting, albeit challenging. The thing that was the hardest to wrap my head around was how Next is combining front end with back end in the same project and the way http requests and caching work in the context of a Next application. This project served as an introduction to Next.js for me after I took an Udemy course on this fascinating framework and I will be very happy if I get to work with Next or a technology with a similar concept in the future but this time in a professional setting with peoople I can learn from.


## Challenges
- coming up with a solution for the relationship between user-journal-entry was challenging in terms of data models/schemas
- error handling on the backend and consuming it on the frontend was often frustrating but nevertheless rewarding
- first time I've used VueX + combining it with persistent state with local storage was challenging
- first time I've used the released with Vue 3 Composition API so it took time to get used to but I liked the new approach 
- implementing the entry filters with the help of "dayjs" was a challenge as comparing dates turned out to be not a trivial task, specially for custom date ranges
- first time I've implemented front end pagination
- implementing an external text editor with a custom configuration took a deep dive into documentation and stackoverflow
- coming up with design ideas for the logged in part was hard and ultimately not very successful
- initially not thinking about responsive design proved to be a grave mistake as the CSS ended up messy and the media queries overblown and inconsistent


## Technologies Used  

### Front End
- Vue 3 with Composition API
- Vue Router
- VueX
- Vue3-editor
- Axios
  
 ### Back End
 - Node
 - Express 
 - MongoDB
 - Mongo Atlas
 - Mongoose
 - JWT
 - Axios


## Features
### All users are able to:
- view all of the 8 purely informational pages

### Anonymous users are able to:
- view the landing page
- register
- login

### Authenticated users are able to:
- create multiple journals
- edit a journal's name and description
- delete a journal
- view their journals
- view a single journal with its entries
- create a journal entry with a text editor
- edit a journal entry
- delete a journal entry
- view a journal entry
- filter entries by date including a custom date range filter
- filter for the amount of entries showing on a page
- search entries by title/content
- logout


## Screenshots
![Example screenshot](./img/screenshot.png)


## Setup
### To get a local copy up and running follow these simple steps:

1. Make sure you have **`node`** and **`npm`** installed globally on your machine.  

3. Clone the repo  
    ### `git clone https://github.com/rpashev/next-ecommerce.git`  

3. Install NPM packages  
    ### `npm install`    
  
4. Run the app in development mode with hot reloading  
    ### `npm run dev`  

5. You can view the app on [http://localhost:3000](http://localhost:3000)  
 
7. To build for production run the following command  
    ### `npm run build`


## Room for Improvement
- redesign the logged in part of the app 
- use a mobile first approach when styling and preferebly switch to SCSS
- refactor some of the more repetitive code on the front end by implementing composables/hooks when appropriate
- implement an "Auto Logout" functionality on JWT expiration
- break up some of the larger components
- implement a backend pagination for the journal entries
- implement a feature that allows users to add images to their entries


## Contact
Created by me - feel free to contact me!
