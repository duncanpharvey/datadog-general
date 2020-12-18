var interval = setInterval(checkQueue, 30000);

var num = document.querySelector(`a[href='/agent/filters/${QUEUE_ID}'] > span`).textContent;

async function checkQueue() {
    console.log(`checking self assign queue at ${new Date(Date.now())}`);

    var button = document.querySelector("[class='pane left section'] > header > h1 > button");
    if (button) await button.click();
    else return;

    var newNum = document.querySelector(`a[href='/agent/filters/${QUEUE_ID}'] > span`).textContent;
    if (newNum != num) {
        num = newNum;
        fetch(SLACK_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ "text": `${num} ticket${num == 1 ? '' : 's'} in self assign training queue` })
        });
    }
}