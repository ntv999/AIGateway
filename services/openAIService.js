const OpenAI = require('openai');
const { zodResponseFormat } = require('openai/helpers/zod');
const { z } = require('zod');
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const WineDescription = z.object({
    characteristics: z.object({
      region: z.string(),
      color: z.string(),
      aroma: z.string(),
      taste: z.string()
    }),
    features: z.string(),
    combinations: z.string()
});

const makeAIRequest = async(wine) => {
    const prompt = "Описание вина по-русски " + wine.brand + " " + wine.name;
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            }
          ]
        }
      ],
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: zodResponseFormat(WineDescription, "wine_description")
    });

    const message = completion.choices[0].message.content;
    const jsonResponse = JSON.parse(message);
    return jsonResponse;
};
module.exports = { makeAIRequest };


