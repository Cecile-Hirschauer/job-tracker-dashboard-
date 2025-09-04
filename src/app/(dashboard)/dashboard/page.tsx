"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationCard } from "@/components/dashboard/application-card";
import {
  FileText,
  Building2,
  Users,
  TrendingUp,
  Plus,
  Calendar,
} from "lucide-react";

// Mock data - remplacez par de vraies données de votre API
const mockApplications = [
  {
    id: "1",
    title: "Développeur Full Stack Senior",
    description: "Développement d'applications web modernes avec React et Node.js dans une équipe agile. Opportunité de travailler sur des projets innovants.",
    status: "INTERVIEW" as const,
    priority: "HIGH" as const,
    salary: 65000,
    location: "Paris, France",
    jobType: "FULL_TIME" as const,
    source: "LinkedIn",
    jobUrl: "https://example.com/job/1",
    appliedAt: new Date("2024-01-15"),
    interviewAt: new Date("2024-01-25"),
    createdAt: new Date("2024-01-15"),
    company: {
      id: "1",
      name: "TechCorp",
      logo: "/placeholder-company.jpg",
      industry: "Technologie",
      location: "Paris",
    },
    contact: {
      id: "1",
      firstName: "Marie",
      lastName: "Dubois",
      email: "marie.dubois@techcorp.com",
      position: "Responsable RH",
    },
  },
  {
    id: "2",
    title: "Lead Developer React",
    description: "Diriger une équipe de développeurs frontend et contribuer à l'architecture technique des applications React.",
    status: "APPLIED" as const,
    priority: "MEDIUM" as const,
    salary: 70000,
    location: "Lyon, France",
    jobType: "FULL_TIME" as const,
    appliedAt: new Date("2024-01-20"),
    createdAt: new Date("2024-01-20"),
    company: {
      id: "2",
      name: "InnovateLab",
      industry: "Startup",
      location: "Lyon",
    },
  },
  {
    id: "3",
    title: "Consultant Technique",
    description: "Accompagner les clients dans leur transformation digitale et développer des solutions sur mesure.",
    status: "OFFER" as const,
    priority: "HIGH" as const,
    salary: 80000,
    location: "Remote",
    jobType: "CONTRACT" as const,
    appliedAt: new Date("2024-01-10"),
    createdAt: new Date("2024-01-10"),
    company: {
      id: "3",
      name: "Digital Solutions",
      industry: "Conseil",
      location: "Bordeaux",
    },
    contact: {
      id: "2",
      firstName: "Pierre",
      lastName: "Martin",
      email: "p.martin@digitalsol.com",
      phone: "+33 6 12 34 56 78",
      position: "Directeur Technique",
    },
  },
];

const stats = [
  {
    title: "Candidatures actives",
    value: "12",
    description: "En cours de traitement",
    icon: FileText,
    trend: "+2 cette semaine",
  },
  {
    title: "Entreprises contactées",
    value: "8",
    description: "Différentes entreprises",
    icon: Building2,
    trend: "+1 cette semaine",
  },
  {
    title: "Entretiens programmés",
    value: "3",
    description: "À venir",
    icon: Calendar,
    trend: "2 cette semaine",
  },
  {
    title: "Taux de réponse",
    value: "67%",
    description: "Réponses reçues",
    icon: TrendingUp,
    trend: "+5% ce mois-ci",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-in-left">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Suivez vos candidatures et gérez vos opportunités professionnelles
          </p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 border-0 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle candidature
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-in-right">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="hover-lift bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-2xl transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-pulse-glow">
                <stat.icon className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {stat.description}
              </p>
              <Badge className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border border-green-500/20 hover:shadow-sm transition-all duration-200">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slide-in-left">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
            Candidatures récentes
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-700/80 border-white/40 dark:border-slate-600/40 hover:scale-105 transition-all duration-200"
          >
            Voir tout
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockApplications.map((application, index) => (
            <div 
              key={application.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ApplicationCard
                application={application}
                onEdit={(id) => console.log("Edit application", id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/30 shadow-lg animate-fade-in-up">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-float">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Actions rapides
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Accédez rapidement aux fonctionnalités principales
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button 
            variant="outline"
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-700/60 border-white/40 dark:border-slate-600/40 hover:scale-105 transition-all duration-200 hover-lift"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une entreprise
          </Button>
          <Button 
            variant="outline"
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-700/60 border-white/40 dark:border-slate-600/40 hover:scale-105 transition-all duration-200 hover-lift"
          >
            <Users className="mr-2 h-4 w-4" />
            Nouveau contact
          </Button>
          <Button 
            variant="outline"
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-700/60 border-white/40 dark:border-slate-600/40 hover:scale-105 transition-all duration-200 hover-lift"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Programmer un entretien
          </Button>
          <Button 
            variant="outline"
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-700/60 border-white/40 dark:border-slate-600/40 hover:scale-105 transition-all duration-200 hover-lift"
          >
            <FileText className="mr-2 h-4 w-4" />
            Exporter les données
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}