plugins {
    kotlin("jvm") version "2.1.10"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

val ktor_version: String by project

dependencies {
    testImplementation(kotlin("test"))
    implementation("io.ktor:ktor-client-core:$ktor_version")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("dev.kord:kord-core:0.15.0")
    implementation("com.slack.api:bolt:1.18.0")
    implementation("com.slack.api:bolt-jetty:1.18.0")
    implementation("com.slack.api:slack-api-client-kotlin-extension:1.18.0")
}
tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}