"use client";

import React, { useState, useEffect, useRef } from 'react';
import ThreeCanvas from '@/components/3d/ThreeCanvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDown, Download, Send } from 'lucide-react';
import { personalInfo, skills, projects, experience, contact } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-glow-primary">Loading Pathak Labs...</p>
  </div>
);

const Section = ({ id, children, className }: { id: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`min-h-screen w-full flex items-center justify-center relative ${className}`}>
    <div className="container max-w-4xl mx-auto px-4">
      {children}
    </div>
  </section>
);

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
  };
  
  const handleCanvasLoad = () => {
    setLoading(false);
    if(pageRef.current) {
        pageRef.current.style.opacity = '1';
    }
  }

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <div ref={pageRef} className="relative opacity-0 transition-opacity duration-1000">
        <ThreeCanvas onLoad={handleCanvasLoad} />
        <div className="scroll-container relative z-10 text-white" style={{ height: '600vh' }}>
          
          <section id="hero" className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-glow-primary mb-4">{personalInfo.name}</h1>
            <p className="text-lg md:text-xl text-cyan-300 text-glow-accent mb-8 max-w-2xl">{personalInfo.role}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="neon-glow-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>View Projects</Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black neon-glow-accent"><Download className="mr-2 h-4 w-4" /> Download Resume</Button>
              <Button size="lg" variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Me</Button>
            </div>
            <div className="absolute bottom-10 animate-bounce">
              <ArrowDown className="h-8 w-8 text-primary" />
            </div>
          </section>

          <Section id="about">
            <Card className="glass-card p-8">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-glow-primary">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-300 leading-relaxed">{personalInfo.about}</p>
              </CardContent>
            </Card>
          </Section>

          <Section id="skills">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-glow-primary mb-12">Holographic Skills Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillCategory) => (
                  <Card key={skillCategory.category} className="glass-card group hover:border-primary transition-all duration-300">
                    <CardHeader className="flex-row items-center gap-4">
                      <skillCategory.icon className="w-10 h-10 text-primary neon-glow-primary" />
                      <CardTitle className="text-2xl">{skillCategory.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillCategory.items.map((item) => (
                          <div key={item} className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm">{item}</div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          <Section id="projects">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-glow-primary mb-12">Project Showcase</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => {
                  const image = PlaceHolderImages.find(p => p.id === project.image);
                  return (
                    <Card key={project.id} className="glass-card overflow-hidden group cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300" onClick={() => handleProjectClick(project)}>
                       {image && (
                        <div className="relative h-48 w-full">
                          <Image src={image.imageUrl} alt={project.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint={image.imageHint}/>
                        </div>
                       )}
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Section>
          
          <Section id="experience">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-glow-primary mb-12">Career & Education Timeline</h2>
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-border/50"></div>
                    {experience.map((item, index) => (
                        <div key={index} className={`flex items-center w-full mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                <Card className="glass-card p-6 inline-block w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                                    <div className="flex items-center gap-4 mb-2">
                                        <item.icon className="w-6 h-6 text-primary" />
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.institution} | {item.date}</p>
                                    <p className="text-sm mt-2">{item.description}</p>
                                </Card>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary neon-glow-primary border-4 border-background"></div>
                        </div>
                    ))}
                </div>
            </div>
          </Section>

          <Section id="contact">
            <Card className="glass-card max-w-2xl mx-auto p-8">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-glow-primary">Contact Me</CardTitle>
                    <p className="text-muted-foreground">Have a project or question? I'd love to hear from you.</p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <Input type="text" placeholder="Your Name" className="bg-background/50 text-base" />
                        <Input type="email" placeholder="Your Email" className="bg-background/50 text-base" />
                        <Textarea placeholder="Your Message" className="bg-background/50 text-base" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                {contact.links.map(link => (
                                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <link.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>
                            <Button type="submit" size="lg" className="neon-glow-primary">
                                Send Message <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
          </Section>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-glow-primary">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
              <div>
                  <h4 className="font-semibold mb-2">Impact</h4>
                  <p className="text-sm">{selectedProject?.impact}</p>
              </div>
              <div>
                  <h4 className="font-semibold mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                      {selectedProject?.tech.map(t => <div key={t} className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm">{t}</div>)}
                  </div>
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
