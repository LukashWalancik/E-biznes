# E-biznes
## UJ FAIS 2025
## Łukasz Walancik
Repozytorium służące oddawaniu zadań z kursu E-biznes prowadzonego przez Pana Doktora Karola Przystalskiego na Uniwersytecie Jagiellońskim

### DockerHub:
https://hub.docker.com/repository/docker/wookashwalancik/zadanie1/general

## Zadanie 1 Docker
✅ 3.0 obraz ubuntu z Pythonem w wersji 3.10 [Commit](https://github.com/LukashWalancik/E-biznes/commit/ebe4e583a876dd737a726640d11e54b7aa419037)  
✅ 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem [Commit](https://github.com/LukashWalancik/E-biznes/commit/389d05077e7597b3aa9f70c9f60d41ee0121494d)  
✅ 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC [Commit](https://github.com/LukashWalancik/E-biznes/commit/b38b920bf7cc856d9f14e36f1e12c1d8db4dd6c1)  
✅ 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle [Commit](https://github.com/LukashWalancik/E-biznes/commit/a864d484992209d3b87d47ef167a2afc1dfc4e17)  
✅ 5.0 dodać konfigurację docker-compose [Commit](https://github.com/LukashWalancik/E-biznes/commit/7f19387fed63c7d0bd5ce6109b0f9ce3b849dacd)  
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/1_Zadanie)
### ![Demo](Dema/E-Biznes_Docker.mkv)

## Zadanie 2 Scala
✅ 3.0 Należy stworzyć kontroler do Produktów [Commit](https://github.com/LukashWalancik/E-biznes/commit/13344295d8a942ffea61c8adbf85331a00602bec)  
✅ 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy [Commit](https://github.com/LukashWalancik/E-biznes/commit/24ea8c32b28516668d99f67a7ae8295eb43d0f83)  
✅ 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD [Commit](https://github.com/LukashWalancik/E-biznes/commit/0dfe90e82c8a6d6d3063670c476fe71337a8702b)  
❌ 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok  
❌ 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/Scala/produkty)
### ![Demo](Dema/E-Biznes_Scala.mkv)

## Zadanie 3 Kotlin
✅ 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor,która pozwala na przesyłanie wiadomości na platformę Discord [Commit](https://github.com/LukashWalancik/E-biznes/commit/38e8b29bdb753c59cfef1c4730ad7b4a1af71229)  
✅ 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) [Commit](https://github.com/LukashWalancik/E-biznes/commit/38e8b29bdb753c59cfef1c4730ad7b4a1af71229)  
✅ 4.0 Zwróci listę kategorii na określone żądanie użytkownika [Commit](https://github.com/LukashWalancik/E-biznes/commit/38e8b29bdb753c59cfef1c4730ad7b4a1af71229)  
✅ 4.5 Zwróci listę produktów wg żądanej kategorii [Commit](https://github.com/LukashWalancik/E-biznes/commit/38e8b29bdb753c59cfef1c4730ad7b4a1af71229)  
❌ 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/Kotlin)
### ![Demo](Dema/E-Biznes_Kotlin.mkv)

## Zadanie 4 Go
✅ 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD [Commit](https://github.com/LukashWalancik/E-biznes/commit/a0604fa3314085db045555887eebb095320ffa65)  
✅ 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy) [Commit](https://github.com/LukashWalancik/E-biznes/commit/5b565397e080e795d9205e790dcf32707ff0d26c)  
✅ 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint [Commit](https://github.com/LukashWalancik/E-biznes/commit/f6ca700735b5fcb7f88e1a290b90d32fd297b184)  
✅ 4.5 Należy stworzyć model kategorii i dodać relację między kategorią, a produktem [Commit](https://github.com/LukashWalancik/E-biznes/commit/984f7a8caae8d9475ea055bc7a2b9d2d692dffb8)  
✅ 5.0 pogrupować zapytania w gorm’owe scope'y [Commit](https://github.com/LukashWalancik/E-biznes/commit/3e21a47df9cfe2aff957f30067324618d927f1c5)  
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/Golang)  
### ![Demo](Dema/E-Biznes_Golang.mkv)

## Zadanie 5 Frontend
✅ 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej [Commit](https://github.com/LukashWalancik/E-biznes/commit/f6c8568bae73635c95d5834333c1905171c47d9c)  
✅ 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing [Commit](https://github.com/LukashWalancik/E-biznes/commit/f6c8568bae73635c95d5834333c1905171c47d9c)  
✅ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks [Commit](https://github.com/LukashWalancik/E-biznes/commit/f6c8568bae73635c95d5834333c1905171c47d9c)  
✅ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose [Commit](https://github.com/LukashWalancik/E-biznes/commit/f6c8568bae73635c95d5834333c1905171c47d9c)  
✅ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS [Commit](https://github.com/LukashWalancik/E-biznes/commit/f6c8568bae73635c95d5834333c1905171c47d9c)  
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/React)  
### ![Demo](Dema/E-Biznes_React.mp4)

## Zadanie 6 Testy
✅ 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala) [Commit](https://github.com/LukashWalancik/E-biznes/commit/9996012e6ce04c16708eddc03681d0f30c0698c9)  
✅ 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji [Commit](https://github.com/LukashWalancik/E-biznes/commit/9996012e6ce04c16708eddc03681d0f30c0698c9)  
✅ 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami [Commit](https://github.com/LukashWalancik/E-biznes/commit/9996012e6ce04c16708eddc03681d0f30c0698c9)  
✅ 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint [Commit](https://github.com/LukashWalancik/E-biznes/commit/9996012e6ce04c16708eddc03681d0f30c0698c9)  
✅ 5.0 Należy uruchomić testy funkcjonalne na Browserstacku [Commit](https://github.com/LukashWalancik/E-biznes/commit/9996012e6ce04c16708eddc03681d0f30c0698c9)  

## Zadanie 7 Sonar
✅ 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita [Commit](https://github.com/LukashWalancik/E-biznes/commit/52ddf9432f9971caee7fc419de39f00d236e00fa)  
✅ 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej) [Commit](https://github.com/LukashWalancik/E-biznes/commit/52ddf9432f9971caee7fc419de39f00d236e00fa)  
✅ 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej) [Commit](https://github.com/LukashWalancik/E-biznes/commit/52ddf9432f9971caee7fc419de39f00d236e00fa)  
✅ 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej) [Commit](https://github.com/LukashWalancik/E-biznes/commit/52ddf9432f9971caee7fc419de39f00d236e00fa)  
✅ 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckiej [Commit](https://github.com/LukashWalancik/E-biznes/commit/52ddf9432f9971caee7fc419de39f00d236e00fa)  

## Zadanie 8 Oauth2
✅ 3.0 logowanie przez aplikację serwerową (bez Oauth2) [Commit](https://github.com/LukashWalancik/E-biznes/commit/1ffbcee29767bb3ad6d7c33e523e0573501258d1)  
✅ 3.5 rejestracja przez aplikację serwerową (bez Oauth2) [Commit](https://github.com/LukashWalancik/E-biznes/commit/cd6495042851b3c8e9c0a92fe178f27ffbe07bd2)  
✅ 4.0 logowanie via Google OAuth2 [Commit](https://github.com/LukashWalancik/E-biznes/commit/d5c78c7d4731b2bb58bc262ff29ee468445b9a93)  
✅ 4.5 logowanie via Facebook lub Github OAuth2 [Commit](https://github.com/LukashWalancik/E-biznes/commit/404e5df350f37b428415ec4a72783109f63b4243)  
✅ 5.0 zapisywanie danych logowania OAuth2 po stronie serwera [Commit](https://github.com/LukashWalancik/E-biznes/commit/d5c78c7d4731b2bb58bc262ff29ee468445b9a93)  
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/BookStore)  
### ![Demo](Dema/E-Biznes_Oauth2.mp4)

## Zadanie 9 LLM
✅ 3.0 logowanie przez aplikację serwerową (bez Oauth2) [Commit](https://github.com/LukashWalancik/E-biznes/commit/52d0df32db459e4c8787efc003d6675133a6f148)  
✅ 3.5 rejestracja przez aplikację serwerową (bez Oauth2) [Commit](https://github.com/LukashWalancik/E-biznes/commit/a6b26eb9f6a2fb2632fb5793a9b6b9d214eb0200)  
✅ 4.0 logowanie via Google OAuth2 [Commit](https://github.com/LukashWalancik/E-biznes/commit/4cce6a08f75f1fa13c092317f96a2d157fa82998)  
✅ 4.5 logowanie via Facebook lub Github OAuth2 [Commit](https://github.com/LukashWalancik/E-biznes/commit/699c56b4885d5ebb59c5609c473affa4aa44490b)  
✅ 5.0 zapisywanie danych logowania OAuth2 po stronie serwera [Commit](https://github.com/LukashWalancik/E-biznes/commit/c7ec2105d7a57928b9f4240648050be8c307d0b3)  
### [Kod](https://github.com/LukashWalancik/E-biznes/tree/main/BookStore)  
### ![Demo](Dema/E-Biznes_LLM.mp4)