import { Sparkles } from 'lucide-react';
import './DailyInspiration.css';

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is never too late to be what you might have been.", author: "George Eliot" },
  { text: "The purpose of life is to live it, to taste experience to the utmost.", author: "Eleanor Roosevelt" },
  { text: "Don't ask what the world needs. Ask what makes you come alive.", author: "Howard Thurman" },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "What you do makes a difference, and you have to decide what kind of difference you want to make.", author: "Jane Goodall" },
  { text: "The biggest adventure you can take is to live the life of your dreams.", author: "Oprah Winfrey" },
  { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius" },
  { text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

function DailyInspiration() {
  // Get a consistent quote for the day (changes daily)
  const getDailyQuote = () => {
    const today = new Date().toDateString();
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % QUOTES.length;
    return QUOTES[index];
  };

  const quote = getDailyQuote();

  return (
    <div className="daily-inspiration-card">
      <div className="inspiration-header">
        <Sparkles size={18} className="inspiration-icon" />
        <span className="inspiration-label">Daily Inspiration</span>
      </div>
      <p className="inspiration-quote">"{quote.text}"</p>
      <p className="inspiration-author">— {quote.author}</p>
    </div>
  );
}

export default DailyInspiration;
