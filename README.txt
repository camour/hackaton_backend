Purpose:
This repository is part of hackathon project and implements a part of the Infrastructure Node of the OMEM2M architecture.
Let's keep in mind we have 4 nodes for the whole hackathon project: Sensors, Gateway (Middle Node), Infrastructure Node, User Web application
Here we will focus on the the Infrastructure Node part. To be more precised, the Infrastructure Node hosts 2 main softwares : 

		- the IN-CSE eclipse software 
			AND 
		- a Node JS server to handle subscription and send notifications to the user web app as well as the login/logout part of the user web app

This repository is the code for this Node JS server.
The goal of this Node JS server is to forward patients'datas (acceleration and temperature) from the gateway to the web application that is running on the Chrome navigator
Thus we can consider this Node JS server as an interface between our Middle Node (raspberry pi 3) and our user web application. Everytime the Middle Node receives data
from the sensors, the Middle Node sends this data to our Node JS Server. The Node JS server then sends a notification (that contains data) to the user web app.

------------------------------------------------------------------------------

Project installation : 

- install Node JS on this link: https://nodejs.org/en/download/
- open a terminal and run the following line command : "git clone https://github.com/camour/hackathon-backend.git"
- once you cloned the repo, go under "hackathon-backend" repository using "cd" line command: cd hackathon-backend
- run the following line command to install all the Node dependencies required for the project :  npm install
- if the terminal prompts any question about installing a module, press "Y"

------------------------------------------------------------------------------

Project configuration :
- Let's keep in mind we have 4 nodes for the whole hackathon project: Sensors, Gateway (Middle Node), Infrastructure Node, User Web application
- first go to the ".env" file located at the repository of this backend project and edit the following lines : 
	- "WEB_USER_APPLICATION_NODE=http://localhost:80" => replace the "localhost:80" part ONLY by the URL of where the user web app is displayed at
	- "GATEWAY_NODE=http://localhost:8080/~/mn-cse/" => replace ONLY the "localhost" part by the IP address of where your IN-CSE runs at
	- "SERVER_NODE=http://localhost:3000/" => replace the "localhost" part by the IP address of where your server node will be running at

------------------------------------------------------------------------------

Project launch :
- on a terminal, under "hackathon-backend" repo, run the following line command : nodemon server.js
