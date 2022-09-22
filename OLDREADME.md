# Blueprint sketch

## De què anirà la vostra app

Un wishlist on steroids de pel·lícules, sèries, llibres o articles

## Qui problema resol?

Explotar la FOMO que molts portem dins respecte al consum cultural.
Deixar de perdre el temps donant voltes i més voltes a la corrua de continguts
oferts per les diferents plataformes de continguts.

O bé el seu Algorisme no funciona perquè respon a altres interessos més enllà
del teu gust particular o bé no té prou contingut de qualitat.
En qualsevol cas, la millor guia són el boca-orella i les recomanacions de gent
que et coneix o amb qui hi ha certa afinitat de gustos.

Sovint em passa que quan tinc algun temps mort no sé què mirar, tot i saber que
algú en algun moment em va recomanar tal sèrie o llibre. Però soc incapaç de
recordar què era ni si és el més adequat pel temps que disposo.

## Quina API consumeix?

N'he anotat algunes però sense mirar res a fons.

- https://www.themoviedb.org/documentation/api
- https://simkl.docs.apiary.io/
- http://www.goodreads.com/api
- https://developers.google.com/books

### API de TMDB

D'entrada ens limitarem a usar l'api de themoviedb.  
Suporta CORS.  

Més informació a [./doc/ExternalAPI.md](doc/ExternalAPI.md)

## Quin serà el seu usuari habitual?

Un diagrama de Venn mostrant la intersecció entre geeks, content junkies i
keyboard workflow lovers.  

## Quines característiques i funcionalitats tindrà?

### Disseny
- [UX (doc/UX.md)](doc/UX.md)
- [Architecture (doc/ARCH.md)](doc/ARCH.md)

### Resum
- Cercador tipus omnibox que permeti agregar el contingut a la llista d'una
  forma ràpida. Ha de ser pràctic, treure el mòbil/desktop i notar amb una o
  dues interaccions.
- Afegir anotacions al contingut, referències sobre qui l'ha recomanat
- Seguiment de capítols
- Recomanacions en funció del temps disponible, mood, gènere.
- Arxivar contingut
- Afegir noves fitxes de contingut mitjançant enllaços
- Local storage amb objectes ben estructurats. [Notes Storage](#remote-storage)

### TODO (long term)

#### Sync

Usar Firebase per mantenir les dades sincronitzades entre dispositius.
[Notes Storage](#remote-storage)

#### Social

El component social: Integració amb altres serveis com goodreads, themoviedb,
simkl.com o youtube

## Notes

#### Remote Storage

Planteja el projecte usant local storage i posa com a ampliació / línia
futura la integració amb Firebase pel tema de sincronitzar entre dispositius.
Si hi ha temps a fer la part de Firebase, bravo. Si no, igualment tens una
webapp funcionant bé.

A banda, si el tema local storage el fas amb objectes ben estructurats, després
tens una part del camí recorregut per Firebase. I a banda, afegir Firebase no
impedeix que t'interessi igualment tenir local storage, perquè així l'aplicació
pugui sempre funcionar en local encara que no tingui connexió a Internet i fer
posteriorment les sincronitzacions quan en torni a tenir.
