var view = document.querySelector(".filter-title").textContent;
var ticketSet = new Set();

// check view every 30 seconds
var interval = setInterval(checkView, 30000);

async function checkView() {
    console.log(`checking ${view} at ${new Date(Date.now())}`);

    // reset view and tickets if the view changed
    if (view != document.querySelector(".filter-title").textContent) {
        view = document.querySelector(".filter-title").textContent;
        ticketSet = new Set();
    }

    // refresh views
    var button = document.querySelector("[class='pane left section'] > header > h1 > button");
    if (button) await button.click();
    else return;

    // get tickets, sort, and save urls in a set
    var tickets = Array.from(document.querySelectorAll("#table1 tbody a"));
    tickets.sort();
    var newTicketSet = new Set(tickets.map(ticket => ticket.href));

    // if the set of tickets is different than the previous run, update the set of tickets to be current and send to Slack
    if (!isEqual(ticketSet, newTicketSet)) {
        ticketSet = new Set();

        var message = `${tickets.length} ticket${tickets.length == 1 ? '' : 's'} in ${view}\n`;
        console.log(message);

        for (var ticket of tickets) {
            ticketSet.add(ticket.href);
            message += `${ticket.href} ${ticket.querySelector("span").textContent}\n`;
        }

        fetch(SLACK_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ "text": message })
        });
    }
}

function isEqual(setA, setB) {
    for (var elem of setA) {
        if (!setB.has(elem)) return false;
    }
    for (var elem of setB) {
        if (!setA.has(elem)) return false;
    }
    return true;
}