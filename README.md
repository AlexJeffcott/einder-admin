```bash
craloc=$(which create-react-app)
echo $craloc
rm -r $craloc
npx create-react-app einder-admin --template typescript
cd einder-admin
npm i normalize.css react-router-dom @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
npm i -D cypress @testing-library/react @types/react-router-dom
```

in package.json change the 'scripts' object to look like the below:
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "cy": "cypress open"
  },
```

```bash
npm i helmet react-table react-forms
```

start the app
```bash
docker-compose up -d --build
```

stop the app
```bash
docker-compose stop
```





docker-compose -f docker-compose-prod.yml up -d --build
