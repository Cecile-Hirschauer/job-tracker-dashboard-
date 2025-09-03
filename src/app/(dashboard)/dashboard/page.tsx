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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Suivez vos candidatures et gérez vos opportunités professionnelles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle candidature
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge variant="secondary" className="text-xs mt-1">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Candidatures récentes</h2>
          <Button variant="outline" size="sm">
            Voir tout
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onEdit={(id) => console.log("Edit application", id)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une entreprise
          </Button>
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Nouveau contact
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Programmer un entretien
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Exporter les données
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}