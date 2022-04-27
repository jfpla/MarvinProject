# Apis Externes

## API de TMDB

### Suporta CORS
```http
access-control-allow-origin     *
access-control-allow-methods    GET, HEAD, POST, PUT, DELETE, OPTIONS
```

### Documentació sobre l'endpoint a usar:  
https://developers.themoviedb.org/3/search/multi-search  
https://api.themoviedb.org/3/search/multi?api_key={API_KEY}&query=severance  
La idea és fer una query que retorni tan resultats de pel·lícules, sèries i
actors per anar filtrant posteriorment en local.

### Àmbit d'acció
D'entrada ens limitarem a desenvolupar el projecte usant un sol endpoint de 
l'api de themoviedb. Amb això en tenim prou per dissenyar la funcionalitat 
de tota l'app i reutilitzar els diferents components quan vulguem ampliar
els serveis que hagi d'oferir.
