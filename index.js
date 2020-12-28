const base_api_url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=";

const shorthand_dict = {
    "special summon": "SS",
    "Special Summon": "SS",
    "graveyard": "GY",
    "Graveyard" : "GY", 
    "Cannot be destroyed by battle with": "Undefeatable from"
};

function formatAPI() {
    var cardName = document.getElementById('cardNameInput').value;
    cardName = cardName.replace(/ /g, "%20");
    getData(cardName);
}

async function getData(cardName) {
    const response = await fetch(base_api_url + cardName);
    const data = await response.json();
    var cardText = data.data[0].desc;
    var shorthandText = formatCardResult(cardText);
    var textPercentage = Math.round(100 * (1 - (shorthandText.length / cardText.length)));

    document.getElementById('cardDescription').textContent = cardText;
    document.getElementById('shorthandDescription').textContent = shorthandText;
    document.getElementById('textReduction').textContent = textPercentage;
}

function formatCardResult(cardText) {
    for (key in shorthand_dict) {
        cardText = cardText.replaceAll(key, shorthand_dict[key])
    }
    return cardText; 
}

document.getElementById('submitButton').addEventListener('click', formatAPI);