import React, { useState } from 'react';
import { generateProImage } from '../services/geminiService';
import { ImageSize } from '../types';
import { Image as ImageIcon, Loader2, Sparkles, Download } from 'lucide-react';

export const ImageGenTool: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;

        setLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const url = await generateProImage(prompt, size);
            setImageUrl(url);
        } catch (err: any) {
            setError(err.message || "Failed to generate image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                    Ocean Visions Pro
                </h2>
                <p className="text-slate-400">
                    Generate high-fidelity marine concept art using Gemini Pro Vision.
                </p>
            </div>

            <div className="space-y-6 bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Prompt</label>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A futuristic underwater research station, bioluminescent jellyfish..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-600"
                        />
                    </div>
                    
                    <div className="md:w-48 space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Resolution</label>
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value as ImageSize)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        >
                            <option value={ImageSize.SIZE_1K}>1K Standard</option>
                            <option value={ImageSize.SIZE_2K}>2K High Def</option>
                            <option value={ImageSize.SIZE_4K}>4K Ultra HD</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!prompt || loading}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                        !prompt || loading
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-blue-500/25 hover:scale-[1.01]'
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" /> Creating Vision...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" /> Generate Image
                        </>
                    )}
                </button>
                
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}
            </div>

            {imageUrl && (
                <div className="bg-slate-800/50 p-2 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden shadow-2xl">
                    <img 
                        src={imageUrl} 
                        alt="Generated Vision" 
                        className="w-full h-auto rounded-xl"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <span className="text-slate-400 text-sm">{size} Generated Image</span>
                        <a 
                            href={imageUrl} 
                            download={`ocean-echo-vision-${Date.now()}.png`}
                            className="flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors"
                        >
                            <Download className="w-4 h-4" /> Save Image
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
