import React, { useState, useRef } from 'react';
import { generateVeoVideo } from '../services/geminiService';
import { AspectRatio } from '../types';
import { Camera, Film, Loader2, Upload, Play } from 'lucide-react';

export const VeoTool: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState<string>('');
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.LANDSCAPE);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                // Extract base64 data and mime type
                const base64 = result.split(',')[1];
                setImage(base64);
                setMimeType(file.type);
            };
            reader.readAsDataURL(file);
            setVideoUrl(null);
            setError(null);
        }
    };

    const handleGenerate = async () => {
        if (!image) return;

        setLoading(true);
        setError(null);
        setVideoUrl(null);

        try {
            const url = await generateVeoVideo(image, mimeType, prompt, aspectRatio);
            setVideoUrl(url);
        } catch (err: any) {
            setError(err.message || "Failed to generate video. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                    Veo Cinematic Animator
                </h2>
                <p className="text-slate-400">
                    Transform your marine photography into cinematic videos using our advanced AI.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">1. Upload Source Image</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 transition-colors group aspect-video relative overflow-hidden bg-slate-900/50"
                        >
                            {image ? (
                                <img 
                                    src={`data:${mimeType};base64,${image}`} 
                                    alt="Preview" 
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                                />
                            ) : null}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            <div className="z-10 flex flex-col items-center">
                                <Upload className="w-8 h-8 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-slate-400 font-medium">Click to upload</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">2. Description (Optional)</label>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A cinematic pan of the whale breaching..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">3. Aspect Ratio</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setAspectRatio(AspectRatio.LANDSCAPE)}
                                className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all flex items-center justify-center gap-2 ${
                                    aspectRatio === AspectRatio.LANDSCAPE
                                        ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                <Film className="w-4 h-4" /> 16:9 Landscape
                            </button>
                            <button
                                onClick={() => setAspectRatio(AspectRatio.PORTRAIT)}
                                className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all flex items-center justify-center gap-2 ${
                                    aspectRatio === AspectRatio.PORTRAIT
                                        ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                <Film className="w-4 h-4 rotate-90" /> 9:16 Portrait
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!image || loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                            !image || loading
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:shadow-teal-500/25 hover:scale-[1.02]'
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" /> Generating Video...
                            </>
                        ) : (
                            <>
                                <Camera className="w-6 h-6" /> Animate with Veo
                            </>
                        )}
                    </button>
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* Output */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm flex flex-col items-center justify-center min-h-[400px]">
                    {videoUrl ? (
                        <div className="w-full h-full flex flex-col items-center gap-4">
                            <h3 className="text-lg font-medium text-teal-400 self-start flex items-center gap-2">
                                <Play className="w-4 h-4 fill-current" /> Result
                            </h3>
                            <video 
                                src={videoUrl} 
                                controls 
                                autoPlay 
                                loop 
                                className={`rounded-lg shadow-2xl border border-slate-600 w-full ${aspectRatio === AspectRatio.PORTRAIT ? 'max-w-[300px]' : ''}`}
                            />
                            <a 
                                href={videoUrl} 
                                download="veo_generation.mp4"
                                className="text-sm text-slate-400 hover:text-white underline mt-2"
                            >
                                Download Video
                            </a>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 space-y-4">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-700">
                                <Film className="w-10 h-10 opacity-50" />
                            </div>
                            <p>Generated video will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
