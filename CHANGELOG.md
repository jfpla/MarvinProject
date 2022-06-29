# Diari sobre el procés de planificació i desenvolupament

## (2022-06-28) Integració de la Card de Kevin Powell
- Es refactoritza l'HTML i estils de la carta per adaptar-la al nostre cas d'ús.
- Quan l'API no torna imatges se n'afegeixen unes genèriques de tipus placeholder.
- S'afegeixen icones FontAwesome per distingir el tipus de resultats.
- Es mostren les estadístiques del contingut. 
- S'arreglen bugs relacionats amb com es carreguen els assets.
- Es refactoritza el controlador de la carta.
- S'afegeixen noves taules a la DB per emmagatzemar dades extra sobre els diferents 
tipus de contingut.
- S'afegeixen noves funcions al repositori per gestionar les dades.
- S'afegeix un botó per guardar a la DB informació extra sobre el contingut 
mitjançant nova crida a l'API.
- El botó, a part d'executar la consulta contra la DB o l'API, passa un callback 
a les funcions del repositori per modificar el seu estil quan la transacció 
s'ha acabat.
- Es mou el codi produït en copiar la carta de Kevin Powell al seu propi projecte 
[github/jfpla/card-exercise](https://github.com/jfpla/card-exercise).

## (2022-06-22) Es comença a copiar la Card de Kevin Powell 
- Es decideix utilitzar un sol EvenListener a l'Omnibox controller. Abans 
s'escoltaven "change" i "input" però donava molts maldecaps.
- A mesura que progressa el [video de Kevin Powell](
https://www.youtube.com/watch?v=YmyqlM13JUU), es va copiant i jugant amb el codi. 
En abusar tant de posicions absolutes entre les diferents capes de la carta, 
s'ha d'anar reajustant el CSS perquè les imatges que farem servir tenen proporcions 
diferents de les de l'exemple. 
- S'intenta animar el SVG del background mitjançant CSS enlloc de definir l'animació
al mateix SVG, però no queda tan bé. Es tracta de modificar l'SVG  

## (2022-06-12) SearchResultsView elimina els resultats anteriors
- Abans de tornar a construir la vista de resultats, s'assegura d'haver eliminat 
els anteriors.

## (2022-06-11) Components SearchResults i Card 
- Una primera aproximació als components SearchResults i Card per començar a pintar 
resultats.
- Es refactoritza la funció que carrega l'HTML per tenir més flexibilitat en 
inserir els Cards dins el SearchResults.
- S'afegeixen els controladors corresponents als components anteriors per pintar 
les dades. 
- El controlador de la cerca s'invoca indirectament mitjançant una high order function
que serà usada com a callback quan es dispara la cerca.

## (2022-06-10) Experimentant amb IndexedDB
- Setup de la DB
- Omnibox recupera resultats de la DB quan hi són i en cas contrari els guarda després 
de cridar a l'API

## (2022-05-31) TMDB DTOs, Type annotations and view callback experiment
- Es comencen a estructurar els DTO's de l'API i les relacions entre ells
- S'hi afegeixen Type Annotations. Molt més tard es descobrirà que només són útils per 
documentar i ajudar a l'editor a auto completar les propietats dels DTO. El typeof no 
serveix per conèixer el tipus d'objecte en temps d'execució. 
- S'experimenta amb la creació d'una funció callback high order per cridar a la vista

## (2022-05-27) Es comença a programar el funcionament de l'Omnibox
- OmniboxController utilitza el mecanisme de throttling per minimitzar les
crides a l'API externa i obtenir resultats a mesura que l'usuari va escrivint.
- Es crea l'esquelet del Navigator a partir d'un enum que defineix les seves
seccions.

## (2022-05-18) Es fixa l'arquitectura a MVC + Serveis
- Les vistes van a buscar el seu html i css i el carreguen al dom.
- Els controladors van a buscar les vistes i, si cal, manipulen la vista.
- La capa de models encara està per dissenyar.
- Els serveis són els encarregats d'atacar les API externes i storage.
- S'utilitzen DTO's per definir la forma de les dades que retornen les API.

## (2022-05-12) Es juga amb l'estructura del projecte

## (2022-04-27) Planning development and deploy
- Planificant quina estructura tindrà l'arbre de directoris
- Quin serà l'`entrypoint` del projecte per desenvolupar en local
- Com es resoldrà el problema dels URL paths d'un `SPA` en local
- I com `debugar`

## (2022-04-26) Learning how to start a vanilla JS project

## (2022-04-25) UX design
- Es descriu el funcionament de `Home` i `Omnibox` 

## (2022-04-25) UX design
- Es comença a dissenyar la pàgina principal emfatitzant la caixa de cerca 
omnibox amb [Figma](https://www.figma.com/file/u55CZr72i0HtHgYXoYcBPf/FOMO).  

## (2022-04-24) UX inspiration
- S'han remenat al voltant d'uns 15 dissenys a figma i dribble

## (2022-04-23) UX: Notes sobre disseny
- Recerca sobre com escollir colors 

## (2022-04-22) API research i UX

- S'opta per començar el projecte atacant un sol endpoint de l'API de TMDB.
- Es comença la recerca d'UX revisant projectes existents.
- Es remenen dissenys tipus IMDB a dribbble.com
- Es miren implementacions CSS de cards a youtube

## (2022-04-20) API research

- Es remena la documentació i l'API de TheMovieDB.

## (2022-04-07) Blueprint sketch & API research

- Es fa un primer esbós sobre l'abast del projecte.
