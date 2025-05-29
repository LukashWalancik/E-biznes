# llm-service/main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import random
from huggingface_hub import InferenceClient, InferenceTimeoutError

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
log = logging.getLogger(__name__)

load_dotenv()

HF_API_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL_ID = os.getenv("HF_MODEL_ID", "google/gemma-2b-it")

if not HF_API_TOKEN:
    log.error("Brak zmiennej środowiskowej HF_API_TOKEN. Upewnij się, że plik .env istnieje i zawiera token.")
    raise ValueError("Brak zmiennej środowiskowej HF_API_TOKEN. Upewnij się, że plik .env istnieje i zawiera token.")

client = InferenceClient(token=HF_API_TOKEN)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_llm(request: ChatRequest):
    user_message = request.message
    log.info(f"Odebrano wiadomość od użytkownika: '{user_message}'")

    MODEL_TO_USE = HF_MODEL_ID

    system_prompt = "Jesteś pomocnym asystentem w internetowej księgarni."

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    try:
        log.info(f"Wysyłam zapytanie do modelu LLM: {MODEL_TO_USE}")

        completion = client.chat.completions.create(
            model=MODEL_TO_USE,
            messages=messages,
            max_tokens=150,
            temperature=0.7,
        )

        generated_text = completion.choices[0].message.content.strip()

        log.info(f"Otrzymano odpowiedź z LLM: '{generated_text}'")

        if not generated_text:
            generated_text = "Przepraszam, nie udało mi się wygenerować odpowiedzi lub odpowiedź była pusta."
            log.warning("Wygenerowany tekst był pusty lub nie został poprawnie przetworzony.")

        final_response = generated_text

        return {"response": final_response}

    except InferenceTimeoutError:
        log.error(f"Przekroczono czas oczekiwania na odpowiedź od modelu {MODEL_TO_USE}.")
        raise HTTPException(status_code=504, detail=f"Model LLM nie odpowiedział w oczekiwanym czasie. Spróbuj ponownie.")
    except Exception as e:
        log.error(f"Błąd komunikacji z Hugging Face API: {e}", exc_info=True)
        if "404" in str(e) or "Model not found" in str(e) or "not currently available" in str(e):
             raise HTTPException(status_code=502, detail=f"Model LLM ({MODEL_TO_USE}) nie jest dostępny lub został nieprawidłowo skonfigurowany. Sprawdź nazwę modelu lub dostępność.")
        else:
             raise HTTPException(status_code=500, detail=f"Wystąpił nieoczekiwany błąd serwera: {e}")

if __name__ == "__main__":
    import uvicorn
    log.info("Uruchamiam serwer FastAPI na http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)