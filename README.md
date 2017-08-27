# vue-chat

## Usage

### setup for firebase

Sample Realtime Database Rule
```
{
  "rules": {
    "chats": {
      ".read": true,
      ".write": true
    },
    "messages": {
      ".read": true,
      ".write": true,
      ".indexOn": "chatKey"
    }
  }
}
```

Domain Authentication for `localhost`

### set up file
add initializeApp Config at `src/main.js`

```
$ yarn install && yarn server

or

$ npm install && npm run server
```

see `localhost:3000`