# Digital Humanities #

## Mission: 

The purpose of this software, developed by Henry Deal, Johnny Lindbergh, and Andy Wood, is to aid school history departments in the teaching and comprehension of virtually any historical subject through web-based mapping/projection platform. 


## Prologue:

This software was originally intended for our high-school's AP European History department -- we realized as we were developing that this project would not be scalable with the language and programming style (Node.js and Apache2) we were using. In early February 2018, we pivoted to a larger and more feature-full language that provided us with the tools necessary to expand (Java and Tomcat). With this change, we reaped the benefits of an Object Oriented Programming style that Java provides. Our project then became more streamlined and a more a structured service, evolving in perpetuity from this point forward. 


## Design:

The main challenge surrounding this project is being able variably represent data types with otherwise arbitrary data sets. The idea is that no data types, or the underlying information about them, are subject to hard coding. Other than broader, more definitive types of data like “Point-to-Point Line”, or, “Chart [with some subsection]”, the data and tables submitted to the database are completely reliant on the users. The number of inputs for something like location data cannot be a central and default table – different people have different needs for this kind of software.

For example, if User A made a location data table, the data submitted to that table might be coordinates, an address, or even a phone number. In this sense, since there are no hard coded associations made, the rendering data can be entirely customizable. This not only differentiates us from the current digital mapping projects available, but it adds a degree of necessary complexity to ensure the user is getting exactly the kind of visualization they expect from a platform of this caliber. 













Minimum Viable Product:

General Design: For the minimum viable product. All we need is basic point to point mapping and possible other data representations in addition to simple user logins. It will essentially serve as a proof of concept for D3.js integration with java, DB structure, and an implementation of our arbitrary data associations as functional. 

User: Basic login functionality, Administrator/Moderator privileges, password hashing, a logging system for all the data insertions that user has made (to what dataset, in which project, in what collection, at what time).

System: Some kind of middle-ware for page rendering and restriction (isLoggedIn, isAdmin, isTeacher), constant req updates, passport/session strategies, MongoDB integration (not MySQL for scaling issues).

Render: Script load call from external directory of “render-scripts”. Select collection, general type, and datasets that match that general type – regardless of table values (maybe we can start with a few hard-coded datasets and add more abstraction later).





























## Ideal Product Rollout

### User 
	→ Functional (student):  Login/Logout integration with 1st tier privileges. Password reset/change. User settings page. Ability to add new projects and collections (with some exceptions – needs further discussion). Ability to edit datasets they are granted access to by the set owner (google drive sharing type thing). Requesting access to a set. User personal page to track followed collections and edit projects they’ve created. Search history for collections and recent datasets. Ability to follow users and notifications on new projects/collection when their followed user add new ones. Ability to edit their own data entries sorted by project by collection. Ability to see all data entries they’ve run by project by collection. For datasets from a different moderator, student can suggest an addition to be reviewed by the moderator of that set or can request access to edit (cross school collab).  Cannot add plugins that the moderator did not authorize? Upload files to be rendered with the data (picture or other relevant graphics/data). Download datasets as a .csv Download the rendered graph/map as an image. Create blog posts or papers in projects on the personal user page (prevents our application from being only mapping capable). 

	→ Stylistic (student):
		ANDY HERE’S WHERE YOUR CREATIVE GENIUS SHINES! :D 

	→ Functional (teacher/moderator): Login/Logout integration with 2nd tier privileges. Password reset/change. Moderator settings page. Ability to add new projects and collections (affiliated with a school or not). Ability to edit number of data entry types after creation? Ability to delete unwanted data entries made by students or themselves.  Ability to change name, description and dataset column names (?). Ability to remove writing and reading access to a user. Ability to accept or deny outside student dataset input.  Ability to add users to a set on read or write permissions. Ability to combine school collections (two part handshake, each school moderator has to accept the merge). Ability to add plugins to a collection (automatic integration, or student has to add them if they want them). Ability to delete uploaded files. Ability to assign users in the school affiliated collections tasks (create a new project that…Write a paper that…). Ability to upload files for reading and for narrative purposes. Ability to mark collections as interesting for student users. Link other collections to assignment. Lesson transcripts/plan addition? 

	→ Stylistic (teacher/moderator):

	→ Functional (administrator): Direct connection to the hosting server. Ability to delete collections with no moderator approval (reason must be provided). Ability to delete projects. Ability to remove users. Ability to change permissions. Ability to ban users (by email – temporarily or permanently). Ability to add new plugins that people can add if they want to their projects. Ability to temporary suspend all users from logging in for updates. 

	→ Stylistic (administrator):





## System
	→Middleware: isStudent, isTeacher, isAdmin, isLegitUpload, isMember (of a school collection), isPermissionsOk (r, w, r+w), isOwner (project/collection), isPrivate (project/collection), isMalformed (data entry sanitation check), isLoggedIn, isPluginEnabled, isDataSetLegit (to ensure only user entered data sets are run, if someone gets a bad .csv file on the sys we can avoid it), isMyPage (when user/mod indexes their private pages, checks if it’s actually theirs), isBanned

	
→ Diagramming and System Mapping (the bulk of the designing):

User Hierarchy: (how users exist and privileges from a sys standpoint)

Student Login
Put username and password in frontend → server intercepts inputted values and checks database if they exist ← on error respond with invalid creds → server creates new session using our passport strategy → creates a new session cookie → serialize → index redirect. 
Middleware (resolved true)
isStudent, isLoggedIn 
Middleware Checked 
isStudent, isBanned


## Teacher Login
Put username and password in frontend → server intercepts inputted values and checks database if they exist ← on error respond with invalid creds → server creates new session using our passport strategy → creates a new session cookie → serialize → index redirect. 
Middleware (resolved true)
isTeacher, isLoggedIn 
Middleware Checked
IsTeacher, isBanned


## Administrator Login
Direct ssh connection to server. We’ll have to figure this out later.
Middleware (resolved true)
isAdmin, isLoggedIn
Middleware Checked
None needed





## Data Hierarchy: (how data exists after insertion)

### Collection
The Parent Node
This is the most outward form of data storage. It is a collection of projects. Made by teachers and serves as the location for that teacher’s students projects to be stored. This is what is shared among schools if the teacher so decides. 
Middleware Requirements for indexing 
isLoggedIn, isPermissionsOk, isMember

### Project
This is the second most inward form of data storage. It is the child node of “Collection”. Is stored in collection. Made by teachers or users. Contains data inputs and raw data. Is defined by general type (I.E Point to Point Map, Heatmap, Histogram, etc.) for indexing. 
Middleware Requirements for indexing
isLoggedIn, isPermissionsOk, isPrivate, isMember

### Project Table
3rd most inward form of data storage and is the last level of complexity. Houses all the raw data as per the inputs of the owner of the project when the project was created. 
Middleware Requirements for indexing
isLoggedIn, isPermissionsOk, isMember
(this is just for printing out the contents of a project. There is no instance where a user would index the actual table)


### Database Structure and Flow: 
→ This will come later as we have yet to come to an ultimate conclusion regarding databasing.

## Use Cases: (all imaginable use cases)

### Student Use Cases
→ Student logs in
→ Student indexes their personal page
→ Student wants to enter settings and reset their password
→ Student wants to enter settings and change notification settings
→ Student wants to enter settings and 

### Teacher Use Cases
→ Teacher logs in
→ Teacher indexes their personal page
→ Teacher wants to enter settings and reset their password

→ There’s a buttload more for us to do here. A. Butt. Load.


## Sequencing: (general sys flow and preliminary outline to our routing file)
→ Johnny want to do this part? I know you’re the server and routing guy. 


## Render
→ Let me (Henry) do this part. I have ideas about how rendering will work but I need to let all my thoughts brew. 
