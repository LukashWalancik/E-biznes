// client/app/chat/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from './Chat.module.css';
import { useAuth } from '../context/AuthContext';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const welcomeMessages: string[] = [
  "Witaj! Jestem Twoim asystentem w Książkarni. Jak mogę Ci pomóc dzisiaj?",
  "Cześć! Co nowego w świecie książek? Chętnie odpowiem na Twoje pytania.",
  "Dzień dobry! Pytaj śmiało o książki, zamówienia lub inne kwestie związane z Książkarnią.",
  "Witaj w czacie z asystentem! Jestem gotów do pomocy. O czym chcesz porozmawiać?",
  "Hej! Jeśli masz pytania dotyczące naszej oferty lub potrzebujesz wsparcia, jestem do Twojej dyspozycji."
];

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, userEmail, logout } = useAuth();

  const [isGoogleUserValidated, setIsGoogleUserValidated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (userEmail && userEmail.endsWith('@gmail.com')) {
        setIsGoogleUserValidated(true);
      } else {
        logout();
        router.push('/login?message=Dostęp do czatu tylko dla użytkowników zalogowanych przez Google.');
      }
    } else {
      router.push('/login?message=Musisz być zalogowany, aby korzystać z czatu.');
    }
    setAuthChecked(true);
  }, [isAuthenticated, userEmail, router, logout]); 

  useEffect(() => {
    if (authChecked && isAuthenticated && isGoogleUserValidated && chatHistory.length === 0) {
      const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      setChatHistory([{ sender: 'bot', text: randomWelcome }]);
    }
  }, [authChecked, isAuthenticated, isGoogleUserValidated, chatHistory]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: message.trim() };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = { sender: 'bot', text: data.response };
        setChatHistory((prev) => [...prev, botMessage]);
      } else {
        const errorText = data.detail || 'Wystąpił błąd podczas komunikacji z botem.';
        const errorMessage: Message = { sender: 'bot', text: `Błąd: ${errorText}` };
        setChatHistory((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Błąd sieci lub serwera:', error);
      const errorMessage: Message = { sender: 'bot', text: 'Wystąpił błąd sieci lub serwera. Spróbuj ponownie.' };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!authChecked || !isAuthenticated || !isGoogleUserValidated) {
    return <p>Ładowanie...</p>;
  }

  return (
    <main className={styles.chatPage}>
      <div className={styles.chatContainer}>
        <h1 className={styles.chatTitle}>Asystent Księgarni</h1>
        <div className={styles.messagesBox}>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
              <span className={styles.messageSender}>{msg.sender === 'user' ? 'Ty:' : 'Bot:'}</span>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              <span className={styles.messageSender}>Bot:</span>
              Pisze...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Napisz wiadomość..."
            className={styles.messageInput}
            disabled={isLoading}
          />
          <button onClick={sendMessage} className={styles.sendButton} disabled={isLoading}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </main>
  );
}