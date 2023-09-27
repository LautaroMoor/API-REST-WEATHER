# Open Weather Express API

## Como funciona 
*La API de Pronóstico del Tiempo proporciona información actualizada sobre las condiciones climáticas para ubicaciones geográficas específicas. Con esta API, puedes obtener pronósticos precisos y detalles meteorológicos en tiempo real para ayudarte a planificar tus actividades al aire libre o integrar datos climáticos en tu aplicación.*



## Pasos a seguir para su instalacion
1. Clone el repositorio 

2. Una vez que el repositorio se encuntre descargado procederemos abriremos una terminal en la cual ingresaremos el siguiente comando " ***npm run install*** ".
   De esta forma lograremos instalar todas las dependencias.

3. Procederemos a configurar las variables de entorno encontradas en el archivo **.env**.

4. Una vez configuaradas las variables de entorno 


## Endpoints y sus rutas
**Obtener clima by ciudad**
 ```GET /getById/city?city=nombreCiudad```

**Obtener el próximo día lluvioso por ciudad**
```GET /getById/next-rainy-day?city=nombreCiudad```

**Obtener lista de 30 registros de clima by ciudad**
```GET /getList50Length/next30weather?city=nombreCiudad```

**Obtener lista de 30 registros de clima by ciudad**
```GET /getList50Length/next20weather?city=nombreCiudad```

**Obtener lista clima ciudad con unidad**
```GET /getListFiltered/next30WeatherUnits?city=nombreCiudad&units=unidadesPersonalizadas```

**Obtener lista clima ciudad en diferentes lenguajes**
```GET /getListFiltered/next30WeatherLanguages?city=nombreCiudad&lang=idiomaPersonalizado```


### Postman Documentation
***Ingresa al siguiente link para ver la documentacion***
 >[https://documenter.getpostman.com/view/24334323/2s9YJXb5h7](https://documenter.getpostman.com/view/24334323/2s9YJXb5h7)  