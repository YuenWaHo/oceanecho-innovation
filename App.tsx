
import React, { useState } from 'react';
import { View } from './types';
import { Waves, Menu, X, ArrowRight, Activity, Camera, Cpu, Globe, MapPin, Mail, Box, Search } from 'lucide-react';

// --- Configuration ---

// TODO: Paste your logo image URL here to replace the default icon
const LOGO_URL = ""; 

// --- Shared Components ---

const Navbar: React.FC<{ currentView: View; setView: (v: View) => void }> = ({ currentView, setView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavItem = ({ view, label }: { view: View; label: string }) => (
        <button
            onClick={() => { setView(view); setIsMenuOpen(false); }}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                currentView === view
                    ? 'text-teal-400 bg-teal-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
        >
            {label}
        </button>
    );

    return (
        <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-teal-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setView(View.HOME)}
                    >
                        {LOGO_URL ? (
                            <img 
                                src={LOGO_URL} 
                                alt="OceanEcho Logo" 
                                className="h-10 w-10 object-contain group-hover:scale-105 transition-transform" 
                            />
                        ) : (
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/20">
                                <Waves className="h-6 w-6 text-white" />
                            </div>
                        )}
                        <span className="font-bold text-xl tracking-tight text-white">
                            Ocean<span className="text-teal-400">Echo</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        <NavItem view={View.HOME} label="Home" />
                        <NavItem view={View.ACOUSTIC} label="Acoustic Monitoring" />
                        <NavItem view={View.DIGITAL_TWIN} label="Digital Twin" />
                        <NavItem view={View.AI_ECOLOGY} label="AI Ecology" />
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-400 hover:text-white"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-slate-900 border-b border-slate-800">
                    <div className="flex flex-col gap-2 p-2">
                        <NavItem view={View.HOME} label="Home" />
                        <NavItem view={View.ACOUSTIC} label="Acoustic Monitoring" />
                        <NavItem view={View.DIGITAL_TWIN} label="Digital Twin" />
                        <NavItem view={View.AI_ECOLOGY} label="AI Ecology" />
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Waves className="h-6 w-6 text-teal-600" />
                        <span className="font-bold text-xl tracking-tight text-slate-200">
                            OceanEcho Innovation Ltd.
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Bridging marine biology and cutting-edge technology for conservation.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                    <div className="space-y-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-teal-500" />
                            <a href="mailto:info@oceanecho-innovation.com" className="hover:text-teal-400 transition-colors">
                                info@oceanecho-innovation.com
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-teal-500" />
                            <span>Hong Kong</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Focus Areas</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li>Acoustic Monitoring</li>
                        <li>Digital Twin Technology</li>
                        <li>AI Ecology</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-900 pt-8 text-center text-slate-600 text-sm">
                <p>© {new Date().getFullYear()} OceanEcho Innovation Ltd. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// --- Page Components ---

const Home: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                        Innovating for Marine Conservation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
                        Listening to the <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            Heartbeat of the Ocean
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed drop-shadow-md">
                        A research-led startup pioneering marine acoustic monitoring, digital twin technology, and AI-powered ecological solutions.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button 
                            onClick={() => setView(View.ACOUSTIC)}
                            className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20"
                        >
                            Explore Our Tech <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Acoustic Card */}
                    <div 
                        onClick={() => setView(View.ACOUSTIC)}
                        className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all cursor-pointer backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Activity className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Acoustic Monitoring</h3>
                        <p className="text-slate-400 mb-4">
                            Understanding underwater soundscapes through advanced sound-source separation models.
                        </p>
                        <span className="text-sm font-medium text-blue-400 flex items-center gap-1">Learn more <ArrowRight className="w-4 h-4" /></span>
                    </div>

                    {/* Digital Twin Card */}
                    <div 
                        onClick={() => setView(View.DIGITAL_TWIN)}
                        className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all cursor-pointer backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Box className="w-7 h-7 text-teal-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">Digital Twin Tech</h3>
                        <p className="text-slate-400 mb-4">
                            3D photogrammetry for conservation, translating biological data into immersive experiences.
                        </p>
                        <span className="text-sm font-medium text-teal-400 flex items-center gap-1">Learn more <ArrowRight className="w-4 h-4" /></span>
                    </div>

                    {/* AI Ecology Card */}
                    <div 
                        onClick={() => setView(View.AI_ECOLOGY)}
                        className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all cursor-pointer backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Cpu className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">AI Ecology</h3>
                        <p className="text-slate-400 mb-4">
                            Tackling ecological problems with AI, including automated species ID and traffic monitoring.
                        </p>
                        <span className="text-sm font-medium text-purple-400 flex items-center gap-1">Learn more <ArrowRight className="w-4 h-4" /></span>
                    </div>
                </div>
            </section>

            {/* About / Status */}
            <section className="bg-slate-900/40 py-20 border-y border-slate-800 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                OceanEcho Innovation Ltd. is a research-led startup focused on bridging the gap between scientific data and public understanding. From managing the Bryde's whale project to exploring AI-related technologies for social impact, we are committed to innovative conservation.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                                    <span className="block text-2xl font-bold text-white">HK</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Based</span>
                                </div>
                                <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                                    <span className="block text-2xl font-bold text-teal-400">AI</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Powered</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-6">Current Highlights</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                                            <Globe className="w-5 h-5 text-teal-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-200">Ocean Park Corporation Contract</h4>
                                            <p className="text-sm text-slate-400 mt-1">Preparation of Bryde's whale skeleton for educational display.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <Search className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-200">AI Startup Funding</h4>
                                            <p className="text-sm text-slate-400 mt-1">Applying for funding to scale our soundscape and photo-ID technologies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AcousticPage: React.FC = () => {
    return (
        <div className="pb-20 pt-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Activity className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Acoustic Monitoring</h1>
                    <p className="text-xl text-slate-400">Deciphering the underwater soundscape.</p>
                </div>

                <div className="prose prose-invert max-w-none bg-slate-900/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-teal-400 mb-4">Sound-Source Separation Models</h3>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        The ocean is a noisy place, filled with the sounds of marine life, waves, and increasing anthropogenic noise from shipping and construction. Traditional monitoring often struggles to isolate specific biological signals from this cacophony.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        At OceanEcho, we are developing state-of-the-art <strong>sound-source separation models</strong> driven by machine learning. These models can deconstruct complex audio recordings, effectively "unmixing" the track to isolate specific sounds—whether it's the click of a dolphin or the song of a whale—from background noise.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-semibold text-white mb-2">Ecological Impact</h4>
                            <p className="text-sm text-slate-400">Better understanding of species distribution and behavioral patterns without visual observation.</p>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-semibold text-white mb-2">Noise Pollution Analysis</h4>
                            <p className="text-sm text-slate-400">Quantifying the impact of human activity on marine habitats.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DigitalTwinPage: React.FC = () => {
    return (
        <div className="pb-20 pt-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Box className="w-8 h-8 text-teal-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Digital Twin Technology</h1>
                    <p className="text-xl text-slate-400">3D Photogrammetry for Conservation.</p>
                </div>

                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-teal-400 mb-4">Preserving Marine Heritage</h3>
                        <p className="text-slate-300 leading-relaxed">
                            We specialize in <strong>3D photogrammetry</strong>, a technique that creates high-fidelity digital models from photographs. By translating biological data into digital twins, we ensure that rare specimens are preserved forever in the digital realm and can be accessed by researchers and the public alike.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-600">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-500/10 rounded-lg">
                                <Globe className="w-6 h-6 text-teal-400" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Project Spotlight: Bryde's Whale</h4>
                                <p className="text-slate-300 mb-4">
                                    We are currently managing a significant project for the <strong>Ocean Park Corporation</strong> involving the preparation of a Bryde's whale skeleton.
                                </p>
                                <ul className="list-disc list-inside text-slate-400 space-y-1 text-sm">
                                    <li>Physical skeleton preparation for display.</li>
                                    <li>Creation of immersive educational applications using 3D scans.</li>
                                    <li>Digital archiving for future biological research.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sketchfab Placeholder */}
                    <div className="w-full aspect-video bg-black/40 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-slate-800/20 group-hover:bg-slate-800/10 transition-colors"></div>
                        <Box className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-medium text-lg">3D Model Viewer</p>
                        <p className="text-sm">Interactive Bryde's Whale model coming soon via Sketchfab</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AiEcologyPage: React.FC = () => {
    return (
        <div className="pb-20 pt-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Cpu className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">AI Ecology</h1>
                    <p className="text-xl text-slate-400">Tackling ecological and social problems with Intelligence.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                            <Camera className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Dolphin Photo-ID Automation</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            Identifying individual dolphins is crucial for population monitoring. Manual identification is slow and labor-intensive. We are developing <strong>image recognition models</strong> to automate this process, allowing researchers to process thousands of images rapidly to track individual movements and health.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Traffic Monitoring</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            Understanding human activity is part of ecology. We utilize computer vision for <strong>traffic monitoring</strong>, capable of identifying and classifying vehicles (buses, cars, trucks). This data helps in assessing environmental impact, noise levels, and urban planning in sensitive coastal areas.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-2xl border border-slate-700 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Startup Vision</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        We are currently in the process of applying for <strong>AI-related startup funding</strong> to accelerate these initiatives. Our goal is to scale these tools from local research projects to globally available conservation platforms.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
    const [currentView, setView] = useState<View>(View.HOME);

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 font-sans selection:bg-teal-500/30 relative">
            {/* Global Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Deep Ocean Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0f172a] to-[#020617]"></div>
                {/* Subtle Texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                {/* Accent Glows */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar currentView={currentView} setView={setView} />
                
                <main className="flex-grow">
                    {currentView === View.HOME && <Home setView={setView} />}
                    {currentView === View.ACOUSTIC && <AcousticPage />}
                    {currentView === View.DIGITAL_TWIN && <DigitalTwinPage />}
                    {currentView === View.AI_ECOLOGY && <AiEcologyPage />}
                </main>

                <Footer />
            </div>
        </div>
    );
}
