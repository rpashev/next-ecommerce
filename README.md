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
- the very concept behind Next - SG, SSR, ISR, serveless functions, what executes when - was hard for me to get, having mostly built single page applications up until now
- authentication - using "next-auth" to implement authentication was a struggle, especially when it comes to sending back the data I want when a user logs in
- api - having mostly used Express with its middleware feature, it was harder for me to implement the api for this app, especially in terms or error handling
- redux - I was familiar with Redux in theory but this was the first time I actually used it in the form of redux-toolkit. I found that redux-toolkit greatly improves the developer experience in comparison with plain Redux.
- redux-persist - usually I manually persist the data in local storage/cookies but this time I used another library which meant a lot of research
- styling - I decided to combine Bootstrap(with custom colors) with SCSS with the main idea to lessen the media queries I have to write by using Bootstrap's responsive grid system. I am happy with the decision as I wanted to practice Bootstrap as well, but such a combination at points makes the styling code less readable and all over the place.
- cart feature - this is a very interesting issue that made me spend a lot of time doing research on how e-commerce apps implement it. The most interesting and challenging problem for me was how a potential conflict between the non-empty cart of an anonymous user and a non-empty (old) cart of this same user once he logs in is resolved. I just replaced the old user cart with the more recent one as I didn't want to directly merge them, but it might be better to prompt the user to resolve this potential conflict himself once he logs in.
- gathering all the data for the products was time-consuming (I manually got the data for some products from Adidas/Reebok and pushed it to Mongo Atlas)
- using Mongo without an ORM was new to me and more troublesome than expected
- image caching issues - there are some issues in development mode with image caching that break the app but they seem resolved in a production build. I've spent many hours on this problem and have no solution for it which was/is super frustrating at times(but at least it seems to work fine in production...)
- page/route guards - this worked differently than with SPAs and it took a while before finding a relatively good solution


## Technologies Used  
- React 17.0.2
- Next 12
- NextAuth
- Redux Toolkit
- Redux Persist
- Bootstrap 5
- SCSS
- React Transition Group
- MongoDB
- Mongo Atlas
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
