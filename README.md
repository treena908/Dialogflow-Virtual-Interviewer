# Dialogflow-Virtual-Interviewer
Dialog agent for cognitive health screening
Virtual Interviewer lets users to take a cognitive test.  picture. It collects the speech samples of the users to analyze it for cognitive impairement screening.


How to use?
1. Download the zip file o the project.
2. You can fust simply create a new Dialogflow agent from the Dialogflow console and then import this project to the agent.
3. Importing the prject will create the intents and entities of the agent that you can see in the console.
4. But the fulfillment code (node.js) will not be imported. You have to copy the code form index.js and package.js files from this repository in firebaseFulfillment/firebase/functions folder and paste it to the the respective files in the inline editor of Dialogflow fulfillment webhook console.
5. Then you can save the settings of the agent and test it with Dialogflow Google Assistant integration.
