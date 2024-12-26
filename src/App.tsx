import { useState } from "react";
import { Card } from "./Card";

export type CardDetails = {
  name: string;
  type: "Monster" | "Spell" | "Trap";
  spellType?: "normal" | "quickplay" | "field" | "equip" | "continuous";
  trapType?: "normal" | "continuous" | "counter";
  monsterType?: string;
  level?: number;
  attack?: number;
  defense?: number;
  effect: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [cardType, setCardType] = useState("Monster");
  const [result, setResult] = useState<CardDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const url = import.meta.env.VITE_GROQ_API_URL;
  const defaultModel = import.meta.env.VITE_DEFAULT_MODEL;
  const aiModels = import.meta.env.VITE_GROQ_MODELS.split(',');
  

  async function fetchResponse(model: string) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Research about Yu-Gi-Oh cards and effects, and generate me a card with the name ${title}, of the given card type ${cardType}, and give me your response in the following JSON format. Do not change the names of the keys: 
            { 
              name: 'cardName', 
              type: 'cardType',
              level: '1-12' (only if the card type is monster), 
              attack: 'attackPoints' (only if the card type is monster),
              defense: 'defensePoints' (only if the card type is monster), 
              monsterType: (only if the card type is monster, otherwise skip), 
              effect: 'the effect of the card', 
              spellType: 'normal, quickplay, continuous, field, equip' (only if the type is spell), 
              trapType: 'normal, counter, continuous' (only if the type is trap) 
            } 
            Do not type anything else before or after, just the response for this template.`,
          },
        ],
        model,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed for model ${model}: ${response.statusText}`);
    }

    const content = await response.json();
    return content.choices[0]?.message?.content;
  }

  async function tryParseJSON(jsonString: string): Promise<CardDetails | null> {
    try {
      return JSON.parse(jsonString) as CardDetails;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return null;
    }
  }

  async function work(): Promise<CardDetails | null> {
    for (const model of aiModels) {
      try {
        const effect = await fetchResponse(model);
        const parsed = await tryParseJSON(effect);
        if (parsed) {
          return parsed;
        }
      } catch (error) {
        console.error(`Error using model ${model}:`, error);
      }
    }
    return null;
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const effect = await fetchResponse(defaultModel);
      const parsed = await tryParseJSON(effect);

      if (parsed) {
        setResult(parsed);
      } else {
        console.log("Default model failed, trying alternative models...");
        const fallbackResult = await work();
        if (fallbackResult) {
          setResult(fallbackResult);
        } else {
          setError("Failed to generate a valid card from any model.");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Error during generation:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="title">Enter a title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a title..."
          />
        </div>
        <div>
          <label htmlFor="cardType">Card type</label>
          <select onChange={(e) => setCardType(e.target.value)}>
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Trap">Trap</option>
          </select>
        </div>
        <button onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && <Card {...result} />}
    </>
  );
}

export default App;
