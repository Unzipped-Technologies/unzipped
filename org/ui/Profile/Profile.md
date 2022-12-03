With a profile picture.

Open in "isolated" view to see this component

```js
<Profile
    firstName="Ford"
    lastName="Prefect"
    profilePicUrl="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=40"
    links={[
        {text: 'View Profile', to: '/#button'},
        {text: 'Log out', to: '/#card'},
    ]}
/>
```

With no profile picture.

Open in "isolated" view to see this component

```js
<Profile
    firstName="Zaphod"
    lastName="Beeblebrox"
    links={[
        {text: 'View Profile', to: '/#button'},
        {text: 'Log out', to: '/#card'},
    ]}
/>
```

With no first name and last name.

Open in "isolated" view to see this component

```js
<Profile
    links={[
        {text: 'View Profile', to: '/#button'},
        {text: 'Log out', to: '/#card'},
    ]}
/>
```

Used in the sidebar.

Open in "isolated" view to see this component

```js
<div style={{background: '#002269', width: '500px', padding: '20px'}}>
    <Profile
        firstName="Arthur"
        lastName="Dent"
        links={[
            {text: 'View Profile', to: '/#button'},
            {text: 'Log out', to: '/#card'},
        ]}
        sidebar
    />
</div>
```

For usages when you need condensed view on at all times

Open in "isolated" view to see this component

```js
<div style={{background: '#002269', width: '130px', padding: '20px'}}>
    <Profile
        firstName="Arthur"
        lastName="Dent"
        links={[
            {text: 'View Profile', to: '/#button'},
            {text: 'Log out', to: '/#card'},
        ]}
        sidebar
        condense
    />
</div>
<div style={{background: '#002269', width: '130px', padding: '20px'}}>
    <Profile
        firstName="Arthur"
        lastName="Dent"
        onClick={() => alert('Clicked!')}
        sidebar
        condense
    />
</div>
```
