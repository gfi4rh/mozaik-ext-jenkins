# Mozaïk Jenkins widgets

## Jenkins — Builds

> Montre l'état de plusieurs build donnée sous la forme de liste

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`title`    | yes      | *Titre du widget*
`url`      | yes      | *URL de l'hôte jenkins*
`jobs`     | yes      | *Liste de jobs sour la forme d'un tableau d'objet, contenant le nom du job et un titre*

### usage

```javascript
  {
    type: 'jenkins.builds',
    title : "Jobs Jenkins",
    url : "http://domain.com/jenkins",
    jobs : [{
      name : "devfab",
      title : "DEVFAB"
      },{
          name : "pprfab",
          title : "PPRFAB"
      },{
          name : "prdfab",
          title : "PRDFAB"
      }],
    columns: 2, rows: 1,
    x: 3, y: 0
  }
```

## Jenkins — Tests

> Montre l'état de plusieurs tests donnée sous la forme de liste

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`title`    | yes      | *Titre du widget*
`url`      | yes      | *URL de l'hôte jenkins*
`tests`     | yes      | *Liste de jobs de test sour la forme d'un tableau d'objet, contenant le nom du job et un titre*

### usage

```javascript
  {
    type: 'jenkins.tests',
    title : "Test",
    url : "http://domain.com/jenkins",
    tests : [{
      name : "protractor-devint",
      title : "DEVINT"
    }, {
      name :"protractor-pprint",
      title : "PPRINT"
    }, {
      name : "protractor-prdint",
      title : "PRDINT"
    }],
    columns: 2, rows: 1,
    x: 3, y: 0
  }
```
