# Gra "Furry zbiera monety"

Celem tego ćwiczenia jest napisanie prostej gry w Javascript. W trakcie pracy nad tym zadaniem poznasz technikę programowania obiektowego i dowiesz się, dlaczego używanie obiektów, ich metod i właściwości ma sens. :-)

Bohaterem naszej gry jest **Furry**, który porusza się po planszy o rozmiarach 10x10 pól. 

Na losowym polu planszy znajduje się moneta. Gracz sterując Furrym przy pomocy strzałek na klawiaturze musi dojść do monety. Gdy to zrobi, moneta znika z planszy i pojawia się na innym polu, również losowym, a gracz dostaje 1 punkt.

Gdy gracz uderzy w ścianę, gra się kończy: plansza znika i, jak to w grach komputerowych bywa, pojawia się napis "GAME OVER".

W każdym momencie gry, gracz musi widzieć ile monet już zebrał.

Tutaj możesz obejrzeć przykładowe rozwiązanie: https://marcin-barylka.github.io/js-furry-solution/

## 1. Budowanie planszy

* Zajrzyj do pliku `index.html`. Znajdziesz w nim mnóstwo pustych elementów `<div>`. Jest ich dokładnie 100. Będą to pola kwadratowej planszy o wymiarach 10x10 pól. 
* Zajrzyj do pliku `style.css`, znajdującego się w katalogu `css`. Znajdziesz tam prototyp pliku ze stylami do naszej gry. Podepnij plik CSS do dokumentu HTML.
* W pliku `index.html`, wszystkie elementy `<div>` umieść w elemencie `<section>` tak, aby jeden element `<section>` zawierał wszystkie 100 elementów `<div>`. Nadaj sekcji identyfikator `#board`.
* Nadaj elementom `<div>` znajdującym się wewnątrz elementu o identyfikatorze `#board` następujące właściwości:
    * szerokość 64px i wysokość 64 px,
    * ramkę o szerokości 1 piksela, dowolnego koloru,
    * ustaw wszystkie elementy obok siebie.
* Elementowi `#board` nadaj następujące style:
    * wysokość 640px i szerokość 640px,
    * ustaw cały element na środku ekranu i odsuń go od górnej krawędzi.

Podejrzyj plik `index.html` w przeglądarce. Jeśli wszystko zrobiłeś poprawnie, powinieneś zobaczyć kwadratową planszę o wymiarach 10x10 pól.

## 2. Przygotowanie elementów grafiki gry

Zajrzyj do katalogu `images`. Znajdziesz w nim dwa obrazki:
* `furry.png` -- bohater naszej gry,
* `coin.png` -- przedmiot pożądania naszego bohatera. ;-)

W pliku CSS utwórz dwie klasy:
* `.furry`, której nadaj następujące właściwości:
    - jako tło obrazek `furry.png`,
    - zablokuj powtarzanie tła,
    - spraw, by obrazek wypełniał całe tło.
* `.coin`, której nadaj następujące właściwości:
    - jako tło obrazek `coin.png`,
    - zablokuj powtarzanie tła,
    - spraw, by obrazek wypełniał całe tło.

## 3. Przygotowanie pliku z Javascriptem

* W głównym katalogu projektu utwórz katalog o nazwie `js`. Wewnątrz tego katalogu utwórz plik `app.js`. Podepnij ten plik do dokumentu HTML.
* W pliku `app.js` utwórz obsługę zdarzenia `DOMContentLoaded` i sprawdź, czy działa.

## 4. Przygotowanie obiektów dla Furry'ego i pojedynczej monety.
Musimy stworzyć klasy opisujące Furry'ego i monetę. W tym celu w pliku `app.js`:

* Utwórz konstruktor dla klasy `Furry()`, któremu zdefiniuj następujące właściwości:
    - `x`: pozycja Furry'ego na osi X,
    - `y`: pozycja Furry'ego na osi Y,
    - `direction`: kierunek poruszania się Furry'ego (ta właściwość będzie przyjmowała cztery wartości: `left`, `right`, `up` i `down`, ale tym zajmiemy się później).

    Nasz bohater będzie startował z lewego, górnego rogu ekranu, a szedł będzie w prawo. Nadaj właściwościom `x`, `y` i `direction` początkowe wartości.

* Utwórz konstruktor dla klasy `Coin()`, któremu zdefiniuj następujące właściwości:
    - `x`: pozycja monety na osi X,
    - `y`: pozycja monety na osi Y.

    Pozycja monety po wylosowaniu nie zmienia się aż do momentu jej zebrania przez Furry'ego. Możemy zatem od razu po utworzeniu ją wylosować. Wiemy, że plansza ma rozmiar 10x10 pól (liczone od 0, do 9). Korzystając z podpowiedzi poniżej, nadaj w konstruktorze właściwościom `x` i `y` odpowiednie, losowe wartości.

podpowiedź:
```javascript
Math.floor(Math.random() * 10);
``` 
**Pamiętaj o odpowiednim użyciu słowa kluczowego `this` wewnątrz obiektów!**

## 5. Przygotowanie obiektu zarządzającego grą.

Stworzymy obiekt `Game()`, który będzie przechowywał egzemplarz Furry'ego, monetę, planszę gry i aktualny wynik gracza. Obiekt ten będzie również posiadał metody do zarządzania grą. W tym celu w pliku `app.js`:

* Utwórz konstruktor dla klasy `Game()`, któremu zdefiniuj następujące właściwości:
    - `board`: umieść w niej wszystkie pola planszy. Użyj, znanej Ci, metody łapiącej wszystkie elementy `<div>`, znajdujące się w elemencie `<section>` o identyfikatorze `#board`,
    - `furry`: ta właściwość będzie reprezentowała głównego bohatera gry. Nadaj jej wartość `new Furry()`,
    - `coin`: ta właściwość będzie przechowywała monetę. Nadaj jej wartość `new Coin()`. Zwróć uwagę, że od razu po utworzeniu nowego egzemplarza monety, jej pozycja X i Y są już gotowe,
    - `score`: to będzie aktualny wynik gracza. Nadaj mu wartość 0.

## 6. Obliczanie pozycji.

Pozycja na planszy, zarówno Furry'ego, jak i monety, podawana jest przy użyciu właściwości X i Y. Lista pól planszy jest trzymana w tablicy jednowymiarowej. Jej indeksy mieszczą się w przedziale (0, 99). Jak zatem pogodzić te dwa, różne sposoby zapisu pozycji?

W pliku `app.js` do klasy `Game()` dodaj metodę, która przeliczy pozycję X i Y na indeks tablicy wg. odpowiedniego wzoru.

podpowiedź:
```javascript
indeks = x + y * 10;
```

## 7. Rysowanie stanu planszy.

Skoro mamy już zdefiniowane elementy gry (Furry i moneta) i umieściliśmy je w grze (właściwości `furry` i `coin` w obieckie `Game()`), powinniśmy zaprogramować pokazanie ich na odpowiednich polach planszy.

Aby pokazać Furry'ego, wystarczy elementowi `<div>` planszy, odpowiadającemu pozycji X i Y Furry'ego, nadać klasę `.furry`. Podobnie należy zrobić z monetą. 

Napisz metodę w klasie `Game()`, która to zrobi. Wykorzystaj metodę przeliczającą pozycję, którą napisałeś w poprzednim punkcie.

Następnie zmodyfikuj pozycję X i Y Furry'ego i każ ponownie pokazać Furry'ego na planszy. Czy zauważyłeś niepożądany efekt?

Wyjaśnienie tego efektu jest bardzo proste:

* Furry ma pozycję (0, 0), rysujemy Furry'ego na tej pozycji,
* Zmieniamy pozycję Furry'ego na (1, 0), rysujemy Furry'ego na nowej pozycji,
* **ZONK!** Okazuje się, że na planszy mamy dwa wizerunki bohatera, na pozycjach (0, 0) i  (1, 0),
* Należy zatem usunąć wizerunek Furry'ego z poprzedniej pozycji.

Najłatwiej to zrobić (choć przyznajemy, że nie najbardziej elegancko), iterując po wszystkich polach tablicy z planszą i usuwając z nich klasę `.furry`.

## 8. Obsługa klawiatury.

Gra powinna reagować na klawisze strzałek kursora. Musimy napisać metodę w klasie `Game()`, która przyjmie jako parametr zmienną o nazwie `event`. Tej metody użyjemy, jako callbacka, do zdarzenia `keydown`.

Aby pobrać kod wciśniętego klawisza, musimy użyć właściwości `which` obiektu `event`, który jest przekazywany w parametrze.

Aby oszczędzić Wam żmudnego szukania odpowiednich wartości dla klawiszy strzałek, podajemy ich kody:

* **37**: lewo,
* **38**: prawo,
* **39**: góra,
* **40**: dół.

Zmodyfikuj kierunek poruszania się Furry'ego, zależnie od wciśniętego klawisza. Użyj do tego właściwości `direction` w obiekcie `Furry()`, której nadaj odpowiednią wartość: `"up"`, `"down"`, `"left"`, `"right"`.

Wystartuj obsługę klawiszy (napisz obsługę odpowiedniego zdarzenia, a jako funkcję callback użyj metody, którą napisałeś).

**UWAGA:**
*O ile dotychczas używaliśmy właściwości i metod obiektu `Game()` i odnosiliśmy się do nich używając słowa kluczowego `this`, w tym przypadku nie możemy tego zrobić: wewnątrz eventu słowo kluczowe `this` wskazuje na event, nie na obiekt. Aby to ominąć przed deklaracją eventu stwórz zmienną, o nazwie, np. `self`, przypisz do niej wartość `this`, a potem wewnątrz metody obsługującej klawiaturę używaj `self`.*

## 9. Modyfikacja pozycji Furry'ego zależnie od kierunku.

Do tej pory, przy definiowaniu Furry'ego, ustaliliśmy, że na początku będzie poruszał się w prawo, rozpoczynając od lewego, górnego rogu planszy. Niemniej, celem gry jest zmuszenie Furry'ego, aby chodził tak, jak chcemy.

Musimy zatem zmodyfikować pozycję X i Y Furry'ego, w zależności od kierunku, w którym się porusza. Zwróć uwagę na właściwość `direction`, którą zdefiniowaliśmy w punkcie 4. Możemy zatem napisać metodę, która odpowiednio zmodyfikuje właściwości `x` i `y` na podstawie wartości właściwości `direction`.

Na razie nie przejmuj się tym, że Furry może wyjść poza planszę. Zajmiemy się tym nieco później.


## 10. Sprawdzanie kolizji z monetą.

W języku twórców gier, kolizja między dwoma elementami następuje wtedy, gdy elementy te na ekranie nachodzą na siebie. W naszej grze kolizja nastąpi wtedy, gdy pozycja Furry'ego będzie taka sama, jak pozycja monety.

Napisz metodę, która sprawdzi pozycję obu elementów. Jeśli kolizja nastąpi, musisz:

* usunąć monetę z ekranu (nie z obiektu gry),
* dodać 1 do wyniku,
* pamiętać o pokazaniu wyniku na ekranie, w tym celu stwórz gdzieś na ekranie `<div>` lub inny element, który będzie pokazywał aktualny wynik,
* utworzyć nową monetę (dzięki temu, że zadbaliśmy o to przy pisaniu konstruktora, nowa moneta będzie miała losowo wybraną pozycję X i Y). 

**Pamiętaj o tym, że moneta, to tak naprawdę właściwość `coin` w obiekcie `Game()`.**

## 11. Sprawdzanie kolizji ze ścianą.

Gdy Furry zderzy się ze ścianą, następuje koniec gry. Kolizja ze ścianą następuje, wtedy gdy:

* pozycja X Furry'ego jest mniejsza od zera, lub jest większa od 9,
* pozycja Y Furry'ego jest mniejsza od zera, lub jest większa od 9.

Napisz metodę sprawdzającą kolizję ze ścianą. Na razie wnętrze komendy `if` zostaw puste, wrócimy do tego później.

## 12. Tworzenie metody obsługującej pojedynczy krok gry.

Mając wszystkie metody, które obsługują poszczególne elementy rozgrywki, musisz napisać metodę, która będzie obsługiwała pojedynczy krok gry, czyli:

* na podstawie kierunku poruszania się Furry'ego, zmodyfikuje jego położenie,
* sprawdzi kolizję ze ścianą,
* sprawdzi kolizję z monetą,
* wyświetli poszczególne elementy gry na odpowiednich pozycjach.

Uruchom w konsoli tę funkcję kilka razy. Zmień w międzyczasie właściwość `direction` Furry'ego. Dzięki temu przetestujesz działanie gry.

## 13. Let's go!

W poprzednim punkcie wykonywałeś każdy krok gry ręcznie, wywołując odpowiednią metodę. Nie ma to większego sensu, prawda? Musisz, zatem, uruchomić interwał, który co pewną liczbę milisekund wywoła pojedynczy krok gry. 

**UWAGA:**
*Pamiętaj o tym, że  interwał, podobnie jak event, przejmuje kontrolę nad słowem kluczowym `this`. Musisz wykorzystać zmienną `self`, którą zdefiniowałeś przy okazji obsługi klawiatury*

## 14. Game over.

Wróć teraz do momentu sprawdzania kolizji ze ścianą. Wewnątrz funkcji `if` zostawiłeś puste miejsce, do późniejszego wykorzystania. Musisz zakończyć grę, czyli:

* zatrzymać interwał,
* usunąć obsługę eventu klawiatury (dlatego zrobiliśmy go używając metody, nie anonimowego wyrażenia funkcyjnego),
* pokazać napis **GAME OVER** (Twojej inwencji zostawiamy jak go zrobić).

## 15. Ostatnie poprawki. 

Nie zapomnij napisać komendy uruchamiającej grę. :) Jeśli napisałeś wszystko zgodnie z naszą instrukcją, wewnątrz zdarzenia `DOMContentLoaded` powinieneś utworzyć instancję obiektu `Game()`, żeby uruchomić grę.

Zwróć uwagę czy nie musisz czegoś poprawić (np. czy wszystko widać od samego początku gry)? Popraw błędy, które na pewno się pojawią i **ciesz się własnoręcznie napisaną grą**. :)
