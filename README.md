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