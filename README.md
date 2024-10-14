Assignment 2 - Short Stack  
===
 
Ezra Barboza

## Show Tracker

I love watching TV shows but often find myself forgetting the show recommendations that people tell me, or not being able to provide suggestions on the spot.  
This project is an organizational tool to keep track of all the shows you have watched and want to watch, showing not only the name of the shows and directors, but also a comments section and ratings. The tracker further sorts the shows into sections based on whether you liked them or not.  

While this is a personal organizational tool at this time, in the future I could envision it as a forum for TV show enthusiasts to share their best/worst show picks.

Note: Almost all the time, clicking the buttons will automatically update the tables (I have my `loadData` function for the tables called in all of the `onclick` functions), but sometimes if the website has been sitting open for a while, you need to refresh the page if a button was pressed but the tables aren't automatically updating.

Link:  
https://a2-ezrabarb.glitch.me/

## Technical Achievements
- **getElement vs. Query**: In my script, I used `getElementById` for most of the input fields, but I also tried using `querySelector` for the table body data.  
I have no prior experience using either of these functionalities, so I experimented with both to learn more.
- **Variety Of Posts**: With my POST handling, I sent and handled different types of data each time. In some cases, I sent JSON and in others, merely a string with the show's name.  
I was able to handle different types of POST requests, ensuring I only sent as much data as needed for each functionality.
- **Form Reset**: Every time I interacted with a form, I not only loaded the new data but also reset all the forms afterward. This resets the input fields, providing a clean slate after each submission, which is more visually appealing and confirms that the form data was successfully submitted.
- **Status**: My derived data field was `status`, which is one of two values: `good` or `bad`. The status is derived from the rating, where anything 3 or above is considered good, and below is bad. These values are used to sort the shows into `good` or `bad` tables.  
I chose this method to visually show how shows are updated when their ratings change, moving them between tables when the rating changes from good to bad or vice versa.

### Design/Evaluation Achievements
- **User Testing**: While working on this project, I had both of my roommates try the website (without any instructions from me) to ensure the flow and functionality were intuitive for users.
- **Flex**: For creating the side-by-side layout, I applied flexbox techniques based on what we learned in class.
- **Button CSS**: The buttons change color on hover, which adds a pop of color to an otherwise simple page design. I also considered contrast when selecting button colors, background colors, and text colors to ensure readability and visual appeal.
- **Tables**: I implemented a large table showing all of the data, as well as two other tables that sort shows into ones the user liked and ones they didn’t, based on the derived `status` field. These tables update as shows are edited and ratings are changed, visually representing how I like to organize my own lists of shows.
