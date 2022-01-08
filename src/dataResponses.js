//ehhhh

//kay first basic utilities im gonna want to use multiple tiems
const dataFormat = (type, content) => {
    if(type==='text/xml'){
        //this section may need tweaking depending idk
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${content.message}</message>`;
        if(content.id){
            responseXML = `${responseXML} <id>${content.id}</id>`;
        }
        responseXML = `${responseXML} </response>`;
        return responseXML;
    }
    else{
        return JSON.stringify(content);
    }
};

const respond = (request, response, status, content, type) =>{
    //set status code and contnent type
    response.writeHead(status, {'Content-Type': type});
    //write it to response
    response.write(content);
    //send
    response.end();
};

const notFound = (request, response, params, type) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    return respond(request, response, 404, dataFormat(type, responseJSON), type);
};

//okay now let's handle the deck we're working with!
let deck = {
    numCards:0,
};

const deckInit = () =>{
    //this method sets up our default preset deck
    //and adds in all the cards
    let cardNum = 0;
    for(let i = 0; i < 18; i++){
        deck[cardNum] = {
            "name": "Mountain",
            "type": "Land",
            "cost": "0",
            "convertedCost": 0,
            "text": "Tap to add R to your mana pool."
            //possibly add pictures later
        };
        cardNum ++;
    };
    for(let i = 0; i< 4; i++){
        deck[cardNum] = {
            "name": "Lightning Bolt",
            "type": "Instant",
            "cost": "R",
            "convertedCost": 1,
            "text": "Lightning Bolt does 3 damage to one target.",
            //possibly add pictures later
        };
        cardNum++;
    }
    deck[cardNum] = {
        "name":"Earthbind",
        "type":"Enchantment",
        "subtype":"Enchant Creature",
        "cost":"R",
        "convertedCost":1,
        "text":"If cast on a flying creature, Earthbind removes the flying trait and prevents regaining it, and deals 2 damage.",
        //possibly add pictures later
    };
    cardNum++;
    for(let i=0; i<4; i++){
        deck[cardNum] = {
            "name":"Crucible of Fire",
            "type":"Enchantment",
            "cost": "3R",
            "convertedCost":4,
            "text":"Dragon creatures you control get +3/+3",
            //possibly add pictures later
        };
        cardNum++;
    }
    for(let i=0; i<4; i++){
        deck[cardNum] = {
            "name":"Dragon Hatchling",
            "type":"Creature",
            "subtype":"Dragon",
            "cost":"1R",
            "convertedCost":2,
            "text":"Flying. R:Dragon Hatchling gets +1/+0 until end of turn.",
            "power":0,
            "toughness":1,
            //possibly add pictures later
        };
        cardNum++;
    }
    for(let i=0; i<4; i++){
        deck[cardNum] = {
            "name":"Dragon Egg",
            "type":"Creature",
            "subtype":"Dragon",
            "cost":"2R",
            "convertedCost":3,
            "text":`Defender. 
                    When Dragon Egg dies, put a 2/2 red Dragon creature token with flying onto the battlefield. It has \"R:This creature gets +1/+0 until end of turn.\"`,
            "power":0,
            "toughness":2,
            //possibly add pictures later
        };
        cardNum++;
    }
    for(let i=0; i<2; i++){
        deck[cardNum] = {
            "name":"Whelp",
            "type":"Creature",
            "subtype":"Dragon",
            "cost":"2RR",
            "convertedCost":4,
            "text":"Flying. R:Dragon Whelp gets +1/+0 until end of turn. At end of turn, if this ability has been played four or more times this turn, sacrifice Dragon Whelp.",
            "power":2,
            "toughness":3,
            //possibly add pictures later
        };
        cardNum++;
    }
    for(let i=0; i<2; i++){
        deck[cardNum] = {
            "name":"Rakdos Pit Dragon",
            "type":"Creature",
            "subtype":"Dragon",
            "cost":"2RR",
            "convertedCost":4,
            "text":"RR:Rakdos Pit Dragon gains flying until end of turn. R:Rakdos pit dragon gets +1/+0 until end of turn. Rakdos Pit Dragon has double strike if you have no cards in hand.",
            "power":3,
            "toughness":3,
            //possibly add pictures later
        };
        cardNum++;
    }
    deck[cardNum] = {
        "name":"Lightning Dragon",
        "type":"Creature",
        "subtype":"Dragon",
        "cost":"2RR",
        "convertedCost":4,
        "text":"Flying, Echo. R:Lightning Dragon gets +1/+0 until end of turn.",
        "power":4,
        "toughness":4,
        //possibly add pictures later
    };
    cardNum++;
    for(let i=0; i<2; i++){
        deck[cardNum] = {
            "name":"Moltensteel Dragon",
            "type":"Creature",
            "subtype":"Dragon",
            "cost":"4RR",
            "convertedCost":6,
            "text":"Flying. R:Moltensteel Dragon gets +1/+0 until end of turn.",
            "power":4,
            "toughness":4,
            //possibly add pictures later
        };
        cardNum++;
    }
    deck[cardNum] = {
        "name":"Forgestoke Dragon",
        "type":"Creature",
        "subtype":"Dragon",
        "cost":"4RR",
        "convertedCost":6,
        "text":"Flying. 1R:Forgestoker Dragon deals 1 damage to target creature. That creature can't block this combat. Activate this ability only if Forgestoker Dragon is attacking.",
        "power":5,
        "toughness":4,
        //possibly add pictures later
    };
    cardNum++;
    deck[cardNum] = {
        "name":"Flameblast Dragon",
        "type":"Creature",
        "subtype":"Dragon",
        "cost":"4RR",
        "convertedCost":6,
        "text":"Flying. Whenever Flameblast Dragon attacks, you may pay XR. If you do, Flameblast Dragon deals X damage to target creature or player.",
        "power":5,
        "toughness":5,
        //possibly add pictures later
    };
    cardNum++;
    deck[cardNum] = {
        "name":"Shivan Dragon",
        "type":"Creature",
        "subtype":"Dragon",
        "cost":"4RR",
        "convertedCost":6,
        "text":"Flying. R:Shivan Dragon gets +1/+0 until end of turn.",
        "power":5,
        "toughness":5,
        //possibly add pictures later
    };
    cardNum++;
    deck[cardNum] = {
        "name":"Kilnmouth Dragon",
        "type":"Creature",
        "subtype":"Dragon",
        "cost":"5RR",
        "convertedCost":7,
        "text":"Flying. Amplify 3 <i>(As this creature enters the battlefield, put 3 +1/+1 counters on it for each dragon you reveal in your hand.</i> Tap:Kilnmouth Dragon deals damage equal to the number of +1/+1 counters on it to target creature or player.",
        "power":5,
        "toughness":5,
        //possibly add pictures later
    };
    cardNum++;
    deck.numCards = cardNum;
}

const getCards = (request, response, params, type) => {
    const responseJSON = {
        deck : deck,
        id:"success",
    }
    return respond(request, response, 200, dataFormat("application/json", responseJSON), "application/json");
};

const shuffleCards = (request, response, params, type) => {
    for(let i = 0; i < 100; i++){
        //actual max can be swapped around loads if needed
        let a = getRandomInt(deck.numCards);
        let b = getRandomInt(deck.numCards);
        let temp = deck[a];
        deck[a] = deck[b];
        deck[b] = temp;
    }
    getCards(request, response, params, type);
};

//for randomness
function getRandomInt(max){
    return Math.floor(Math.random() * max);
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
}

const drawHand = (request, response, params, type) => {
    const hand = {};
    let handsize = 0;
    //if decksize is less than seven throw some sort of error isntead
    //not an issue while deck is hard coded
    //but if, in future, allow custom decks, it will be.
    let chosenNums = {};
    while(handsize < 7){
        let chosen = getRandomInt(deck.numCards);
        if(!chosenNums[chosen]){
            //if we haven't chosen this number before
            hand[handsize] = deck[chosen];
            chosenNums[chosen] = true;
            handsize++;
        }
    }
    hand.numCards = handsize;
    const responseJSON = {
        deck: hand,
        id: "success"
    };
    return respond(request, response, 200, dataFormat("application/json", responseJSON), "application/json");
}


//oh and exports
module.exports.deckInit = deckInit;
module.exports.getCards = getCards;
module.exports.notFound = notFound;
module.exports.shuffleCards = shuffleCards;
module.exports.drawHand = drawHand;