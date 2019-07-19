const WELCOME_INTENT = 'Default Welcome Intent';
const ANSWER_INTENT = 'Answer:topic';
const FALLBACK_INTENT = 'Default Fallback Intent';
const ACK_INTENT = 'Acknowledgement';
const NO_INPUT_INTENT = 'input.none';
const NO_INPUT_FALLBACK_INTENT = 'input.none.Fallback';
const CLOSING_INTENT='Closing-remark';
const CONTINUE_INTENT='Continue-conversation';

const {dialogflow,Image} = require('actions-on-google');
const functions = require('firebase-functions');
const admin=require('firebase-admin');
var Lemmer = require('lemmer');



var keywords=['boy', 'son', 'brother', 'male', 'child','girl', 'daughter', 'sister', 'female',
             'woman', 'mom', 'mother', 'lady', 'parent', 'female', 'adult', 'grownup',
             'kitchen', 'room','exterior', 'outside', 'garden', 'yard', 'outdoors', 
              'backyard', 'driveway', 'path', 'tree', 'bush', 'cookie','jar','cookie-jar', 'biscuit', 'cake', 'treat',
             'jar', 'container', 'crock', 'pot', 'stool', 'seat', 'chair', 'ladder',
             'sink', 'basin', 'washbasin', 'washbowl', 'washstand', 'tap','watertap',
             'plate','plates','cups','cup','cupboard','dishcloth', 'dishrag', 'rag', 'cloth', 'napkin', 'towel','water', 'dishwater', 'liquid',
             'window', 'frame', 'glass','cupboard', 'closet', 'shelf', 'dish', 'dishes', 'cup', 'cups', 'counter',
             'curtain', 'curtains', 'drape', 'drapes', 'drapery', 'drapery', 'blind', 'blinds', 'screen', 'screens',
			'take', 'takes', 'steal', 'taking', 'stealing','steals',
			'fall','falls', 'falling', 'slip', 'slips','slipping','wash','washes', 'dry', 'clean', 'washing', 'drying', 'cleaning','cleans',
			'overflow', 'spill', 'overflowing', 'spilling','overflown','overflows','apron','puddle','summer', 'hand', 'mouth','laugh','laughing','silent','silence'];
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'ws://virtual-interviewer-ttwdqc.firebaseio.com/',
});

const app = dialogflow({debug: true});
function insert_data(data)
{
  return admin.database().ref('utterances/count').once("value").then((snapshot) => {
      var count = snapshot.child("label").val();
      console.log('insert'+count); 
     return admin.database().ref('utterances').child(count).push({label: data}).then((snapshot) =>{
       console.log('Successfully written:'+snapshot.ref.toString());
      
     }).catch(error => console.error(error));
      //return Number(count)+1;
    });
  
  
}
function update_data()
{
  return admin.database().ref('utterances/count').once("value").then((snapshot) => {
      var count = snapshot.child("label").val();
      console.log('update'+count);
    return admin.database().ref('utterances').child('count').update({label: count+1}).then((snapshot) =>{
       console.log('Successfully updated:'+snapshot.ref.toString());
       
     }).catch(error => console.error(error));
  
      //return Number(count)+1;
    });
  
}

  

// you-data can add a fallback function instead of a function for individual intents
app.fallback((conv,input) => {
 // intent contains the name of the intent
 // you defined in the Intents area of Dialogflow
  const intent = conv.intent;
  const label='utterance';
 switch (intent) {
   case WELCOME_INTENT:
     
     var instruction="INV: This is a picture. Tell me what is happening in the picture.";
     conv.data.fallbackCount=0;
     conv.data.answerCount=0;
     
     conv.ask('This is a picture. Tell me what is happening in the picture.');
     conv.ask(new Image({
    url: 'https://www.researchgate.net/profile/Alfredo_Ardila/publication/266558490/figure/fig2/AS:614316147474443@1523475791364/Plate-1-The-cookie-theft-from-the-Boston-Diagnostic-Aphasia-Examination-Goodglass.png',
    accessibilityText: "Image alternate text",
        
  }));
     
     //insert_data(instruction);
     
    
    
   
    break;
     case ACK_INTENT:
        
        conv.data.fallbackCount=0;
     	
     	conv.ask('go on ');
     //	insert_data(conv.parameters.ack);
     	
        response='INV: okay.';
           
     //   insert_data(response);
     break;
     case ANSWER_INTENT:
     //var Lemmer = require('lemmer');
     var response='';
     //console.log('ans'+conv.data.answerCount);
     const querytext=conv.parameters.topic;
     
     
     //console.log('text'+querytext);
   //  insert_data(querytext);
     if(querytext.toString())
     {
       var is_topic=0;
     
     
    var tokens = querytext.toString().split(" ");
    //console.log(tokens);
    for (let element of tokens)  {
  			if (keywords.indexOf(element) >= 0) {
    			 is_topic=1;
              	break;
              	
			}
      
	}
    if (is_topic)   
    {
      conv.data.fallbackCount=0;
      conv.data.answerCount++;
    /*Lemmer.lemmatize(tokens, function(err, lem_words){
      console.log("ha ha");
  console.log(lem_words); 
      
}).catch(error => console.error(error));*/
     if(conv.data.answerCount==2)
     {
      response='INV: okay ';
     conv.ask('okay');
    // insert_data(response);
     }
     else if(conv.data.answerCount==5|conv.data.answerCount==8)
     {
     response='INV: great';
     conv.ask('great');
    // insert_data(response);
     
     }
      else
      {
        response='INV: hmm';
        conv.ask('hmm');
      //  insert_data(response);
      }
    }
       else
       
       {
         conv.data.fallbackCount++;
         //console.log('fall'+conv.data.fallbackCount);
         if (conv.data.fallbackCount>=2)
         {
           if(conv.data.fallbackCount==2)
           {
           conv.ask('Sorry, I dont get what you are saying. Do you want to continue the conversation? ');
           response='INV: Sorry, I dont get what you are saying. Do you want to continue the conversation? ';
           
       //    insert_data(response);
           }
           else
           {
             conv.close('Sorry, I dont get what you are saying. Pleaase try again later');
           }
         }
         else
         {
           if (conv.data.answerCount>2)
           {
             conv.ask('anything else about what is happening in the picture?');
             response='INV: anything else about what is happening in the picture? ';
           
        //   	insert_data(response);
           }
           else
           {
             conv.ask('Can you tell anything that is happening in the picture?');
              response='INV: Can you tell anything that is happening in the picture?';
           
        //   	  insert_data(response,conv.data.count);
           }
         }
       }
   
     }  	
     	
     	
     	
     break;
     case CONTINUE_INTENT:
     	conv.data.fallbackCount=0;
     	//insert_data(conv.parameters.continue);
     	conv.ask('okay, go on');
        response='INV: okay, go on';
       // insert_data(response);
     
     break;
     case CLOSING_INTENT:
     	conv.data.fallbackCount=0;
     	//insert_data(conv.parameters.closing);
     	conv.close('okay, Thank for your time.');
        response='INV: okay, Thank for your time.';
           
       // insert_data(response);
     	//update_data();
     	
     	
     break;
   
     
  
 }
});
exports.dialogflowFirebaseFulfillment=functions.https.onRequest(app);