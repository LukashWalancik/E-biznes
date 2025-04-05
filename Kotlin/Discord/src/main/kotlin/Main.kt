import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent


val kategorie = listOf("Historyczne", "Fantastyka", "Kryminały", "Literatura piękna")

val ksiazki = mapOf(
    "Historyczne" to listOf("Europa. Rozprawa historyka z historią", "Boże Igrzysko", "Quo Vadis"),
    "Fantastyka" to listOf("Wiedźmin", "Kroniki Czarnej Kompanii", "Droga Królów", "Z Mgły Zrodzony"),
    "Kryminały" to listOf("Niewierni", "Nielegalni", "Sherlock Holmes"),
    "Literatura piękna" to listOf("Przeminęło z wiatrem", "Sto lat samotności", "Egipcjanin Sinuhe")
)


suspend fun main() {
    val token = System.getenv("DISCORD_BOT_TOKEN")
    val kord = Kord(token)

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on

        val content = message.content

        when {
            content == "!ping" -> {
                message.channel.createMessage("pong!")
            }

            content == "!kategorie" -> {
                val response = buildString {
                    appendLine("**Dostępne kategorie książek:**")
                    kategorie.forEach { appendLine("• ${it.replaceFirstChar { c -> c.uppercaseChar() }}") }
                }
                message.channel.createMessage(response)
            }

            content.startsWith("!ksiazki") -> {
                val parts = content.split(" ", limit = 2)
                if (parts.size < 2) {
                    message.channel.createMessage("Podaj kategorię. Przykład: `!Fantastyka`")
                    return@on
                }

                val kategoria = parts[1]
                val lista = ksiazki[kategoria]

                if (lista == null) {
                    message.channel.createMessage("Nie znaleziono kategorii \"$kategoria\". Użyj `!kategorie`, by zobaczyć dostępne.")
                } else {
                    val response = buildString {
                        appendLine("Książki w kategorii \"$kategoria\":")
                        lista.forEach { appendLine("- $it") }
                    }
                    message.channel.createMessage(response)
                }
            }
        }
    }

    kord.login {
        // we need to specify this to receive the content of messages
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}