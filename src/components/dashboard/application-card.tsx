"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  DollarSign,
} from "lucide-react";

// Types basés sur votre schema Prisma
interface ApplicationCardProps {
  application: {
    id: string;
    title: string;
    description?: string;
    status: "APPLIED" | "REVIEWING" | "PHONE_SCREEN" | "TECHNICAL_TEST" | "INTERVIEW" | "FINAL_INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
    priority: "LOW" | "MEDIUM" | "HIGH";
    salary?: number;
    location?: string;
    jobType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP";
    source?: string;
    jobUrl?: string;
    appliedAt?: Date;
    responseAt?: Date;
    interviewAt?: Date;
    createdAt: Date;
    company: {
      id: string;
      name: string;
      logo?: string;
      industry?: string;
      location?: string;
    };
    contact?: {
      id: string;
      firstName: string;
      lastName: string;
      email?: string;
      phone?: string;
      position?: string;
    };
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusColors = {
  APPLIED: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  REVIEWING: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  PHONE_SCREEN: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  TECHNICAL_TEST: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  INTERVIEW: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
  FINAL_INTERVIEW: "bg-pink-500/10 text-pink-700 border-pink-500/20",
  OFFER: "bg-green-500/10 text-green-700 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-700 border-red-500/20",
  WITHDRAWN: "bg-gray-500/10 text-gray-700 border-gray-500/20",
};

const priorityColors = {
  LOW: "bg-gray-500/10 text-gray-700",
  MEDIUM: "bg-blue-500/10 text-blue-700",
  HIGH: "bg-red-500/10 text-red-700",
};

const statusLabels = {
  APPLIED: "Candidature envoyée",
  REVIEWING: "En cours d'examen",
  PHONE_SCREEN: "Entretien téléphonique",
  TECHNICAL_TEST: "Test technique",
  INTERVIEW: "Entretien",
  FINAL_INTERVIEW: "Entretien final",
  OFFER: "Offre reçue",
  REJECTED: "Refusée",
  WITHDRAWN: "Annulée",
};

const jobTypeLabels = {
  FULL_TIME: "CDI",
  PART_TIME: "Temps partiel",
  CONTRACT: "Contrat",
  FREELANCE: "Freelance",
  INTERNSHIP: "Stage",
};

export function ApplicationCard({ application, onEdit, onDelete: _ }: ApplicationCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={application.company.logo} 
                alt={application.company.name} 
              />
              <AvatarFallback className="bg-primary/10">
                <Building2 className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg leading-none">
                {application.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {application.company.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={priorityColors[application.priority]}>
              {application.priority}
            </Badge>
            <Badge variant="outline" className={statusColors[application.status]}>
              {statusLabels[application.status]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        {application.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {application.description}
          </p>
        )}

        {/* Job details */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {application.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{application.location}</span>
            </div>
          )}
          {application.salary && (
            <div className="flex items-center space-x-1">
              <DollarSign className="h-3 w-3" />
              <span>{application.salary.toLocaleString()}€</span>
            </div>
          )}
          {application.jobType && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{jobTypeLabels[application.jobType]}</span>
            </div>
          )}
        </div>

        {/* Contact info */}
        {application.contact && (
          <div className="flex items-center space-x-2 text-sm">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {application.contact.firstName[0]}{application.contact.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">
                {application.contact.firstName} {application.contact.lastName}
              </span>
              {application.contact.position && (
                <span className="text-muted-foreground ml-1">
                  • {application.contact.position}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {application.appliedAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Candidature: {format(new Date(application.appliedAt), "dd MMM yyyy", { locale: fr })}</span>
            </div>
          )}
          {application.interviewAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Entretien: {format(new Date(application.interviewAt), "dd MMM yyyy", { locale: fr })}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {application.contact?.email && (
              <Button variant="ghost" size="sm" asChild>
                <a href={`mailto:${application.contact.email}`}>
                  <Mail className="h-3 w-3" />
                </a>
              </Button>
            )}
            {application.contact?.phone && (
              <Button variant="ghost" size="sm" asChild>
                <a href={`tel:${application.contact.phone}`}>
                  <Phone className="h-3 w-3" />
                </a>
              </Button>
            )}
            {application.jobUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(application.id)}
              >
                Modifier
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}