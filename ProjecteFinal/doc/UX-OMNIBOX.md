# Omnibox

Té dues funcions principals, **substituir el menú tradicional** i **cercar 
contingut**, tant local com remot, entre les diferents seccions de la web.  

Es pot entendre com una mena de LaunchBar/Quicksilver al navegador.

A la part interior esquerra de l'Omnibox apareixerà la `secció actual`.

La secció per defecte serà [HOME](UX-HOME.md) i executarà una `cerca global`.

En clicar sobre la secció es desplega l'omnibox per mostrar el llistat de 
`seccions disponibles`.  

Quan l'omnibox tingui el focus capturarà les tecles `Up/Down` per seleccionar la
secció sobre la qual s'executarà la cerca.

Es passarà el focus a l'`input` quan es detecti qualsevol altra tecla alfanumèrica 
o bé quan s'hagi clicat sobre una secció. 

L'acció de seleccionar una secció altera el `títol` i el `main` de la pàgina. 
Amagant o eliminant la resta de seccions.  

Ha de ser fàcilment usable tant per teclat, ratolí o touch.

La `cerca s'executarà` al prémer enter o quan la cadena de caràcters tingui una
mida suficient (a determinar) per efectuar-la.
