import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ImageSize } from "../types";

// Helper to ensure API key is selected
const ensureApiKey = async () => {
  const win = window as any;
  if (win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await win.aistudio.openSelectKey();
    }
  } else {
      console.warn("window.aistudio is not available. Assuming environment API_KEY is set.");
  }
};

const getClient = async () => {
    await ensureApiKey();
    // Always create a new client to pick up the potentially newly selected key
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateVeoVideo = async (
    imageBase64: string,
    mimeType: string,
    prompt: string,
    aspectRatio: AspectRatio
): Promise<string> => {
    const ai = await getClient();

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || "Animate this image cinematically",
        image: {
            imageBytes: imageBase64,
            mimeType: mimeType,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p', // Current limitation for fast-generate-preview often aligns with 720p or similar
            aspectRatio: aspectRatio,
        }
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
        throw new Error("Failed to generate video URI");
    }

    // Append API key for download if needed, though usually handled by the fetch wrapper or browser context in some envs.
    // Based on instructions: "You must append an API key when fetching from the download link."
    return `${videoUri}&key=${process.env.API_KEY}`;
};

export const generateProImage = async (
    prompt: string,
    size: ImageSize
): Promise<string> => {
    const ai = await getClient();

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
            parts: [{ text: prompt }],
        },
        config: {
            imageConfig: {
                aspectRatio: "16:9", // Defaulting to cinematic for this app
                imageSize: size
            }
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const base64String = part.inlineData.data;
            return `data:image/png;base64,${base64String}`;
        }
    }

    throw new Error("No image data found in response");
};