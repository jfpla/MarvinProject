# Disseny del Home

S'opta per un disseny molt simple on prendran gran protagonisme les seccions de
contingut i la caixa de cerca.  

La idea és amagar els menus i que les funcionalitats es vagin trobant de manera
fluida.  

La `Home` consta bàsicament d'un `header` amb el logo, una gran caixa de cerca 
`omnibox` i l'avatar de l'usuari.

## Header
### Logo
És bàsicament black text

### Omnibox
L'[Omnibox](UX-OMNIBOX.md) Apareixerà amb un element distintiu a la part interior 
esquerra per indicar a quina secció es troba.  
Un text centrat que dirà `< Go to | Search >` i una icona awesome d'una lupa a la dreta.  

Quan es cliqui sobre la caixa es desplegarà per mostrar els controls.

### User Avatar
L'avatar es tractarà de capturar per gravatar quan l'usuari faciliti el mail. 
En cas de no trobar-se constarà d'un cercle amb les inicials i un color random.

## Main
Les seccions tindran una disposició horitzontal per contenir tants [cards](UX-CARD.md)
com es pugui.  
Cada `card` representarà una peça de contingut associada a la seva 
[fitxa](UX-DETAIL.md) corresponent.  

### Search Results (hidden)
### Watching
### TV
### Movies
### Youtube
(extra)