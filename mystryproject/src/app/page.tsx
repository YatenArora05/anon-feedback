'use client';

import Link from 'next/link';
import { Mail, Star, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-16 bg-[#0f1629] text-white">
        
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            True Feedback – Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-white shadow-lg rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-black">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start gap-3 pt-0">
                    <Mail className="text-black flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-black">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black border-gray-200 bg-white hover:bg-gray-50" />
          <CarouselNext className="text-black border-gray-200 bg-white hover:bg-gray-50" />
        </Carousel>

        {/* Why Choose Us Section */}
        <section className="mt-16 w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Shield className="w-8 h-8 text-gray-700" />, title: '100% Anonymous', desc: 'Your identity is never revealed.' },
            { icon: <Zap className="w-8 h-8 text-gray-700" />, title: 'Fast & Secure', desc: 'Built with modern security standards.' },
            { icon: <Star className="w-8 h-8 text-gray-700" />, title: 'Trusted by Users', desc: 'A growing community that values honesty.' },
          ].map((item, index) => (
            <Card
              key={index}
              className="bg-white shadow-md rounded-xl border-0"
            >
              <CardHeader>
                <div className="mb-2">{item.icon}</div>
                <CardTitle className="text-black">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

      </main>

      <footer className="text-center p-6 bg-[#0f1629] text-white/80 mt-12">
        © 2025 True Feedback. All rights reserved.
      </footer>
    </>
  );
}
