# be-resourceful [TODO]

```html
<input be-resourceful='{
    "URLPattern":{
        "protocol": "https",
        "pathname": "/foo/:test.html"
    },
    "set":{
        "value": "pathname.groups.test"
    },
    "fireEvent":{
        "input"
    }
}'>
```

Limitations:  Only initializes value.  Doesn't listen for address changes.
