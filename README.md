# be-resourceful

be-resourceful initiates appHistory's state based on the current URL.


Example 1: Single path

```html
<nav be-resourceful="/foo/:view">
    <a href=foo/myFirstView be-selectable>My First View</a>
    <a href=foo/mySecondView be-selectable>My Second View</a>
</nav>
```

If appHistory.entries.length is 0 (final condition TBD -- maybe if neither cangoback or cangoforward?), and url:  https://my-site.com/foo/myFirstView is opened, sets appHistory.currentState to:

```JavaScript
{
    path: {
        view: myFirstView
    }
}
```




Example 2:  Multiple paths

```html
<nav be-resourceful='["foo/:view", "foo/:edit"]'></nav>
```

Example 3:  Full Access to everything [TODO]


```html
<nav be-resourceful='{
    "resources": [
        {
            "URLPattern":{
                "pathname": "/foo/:view"
            }
        }
    ],
    "validation":{
        "cancelIf": ":not(.selectable)"
    }
}'>


</nav>
```

https://css-tricks.com/how-to-disable-links/


