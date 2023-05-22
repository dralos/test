
# Viceversa | Software Engineer Interview Challenge

*Please read instructions carefully*

Use this file as part of the `README.md` in your repository, and invite su on github (@go-viceversa) when you're done!

## General pointers
We are looking for an experienced engineer who found the sweet spot between pragmatism and idealism.
Your challenge will be evaluated on:
 * Architectural decisions (also implied ones)
 * Test coverage 
 * Adherence to instructions  
 * Cost of further upgrades
 * Cost of maintenance
 * Readability
 * Commit history
 

**Please #1:** make it easy for us to try your project on our machines 🙏  
**Please #2:** if you start with a boilerplate/starter project make it the first commit separated from your contributions 🙏

> **Note:** To balance the need to best show what you can do and the precious time you are dedicating to us: if you want to add something that you would have included it in a real project but you can't do it in the test time constraints, feel free to mock it instead. Beats not letting us know you know 😁


## Requirements

We would like you to implement:

- a POST endpoint `/add-messages` with body as follows, that adds this information to an in-memory store.  
As a side effect, when a message is successfully added, an event should be triggered that sends an email: you can mock the email sending by adding a console log "email sent to ${user} with ${message}" with a timeout of 1 second.  
If from the same request multiple messages are sent, all of them should be sent before accepting another request for the same user.  
**Bonus:** We would like to avoid accidentally sending the same message multiple times, can you find a solution?

```javascript
{
    user: string,
    message: string[],
}
```
example:
```javascript
{
    user: "123@email.com"
    message: [
        "message1",
        "message2"
    ]
}
```


- a GET endpoint `/messages` that gets the full list of user/messages.  
It should be unaffected by the event sending.  
The same user can be used on multiple requests; messages should be unique by user.  
Register the dateTime for the message saving and message sent through the event.  
In the future we expect more events to be triggered, of different kind (ex. event that send an sms); structure your code around that possibility.

- add any kind of API authentication, explaining your choice 

- Please include a postman export in the repo to try your project

