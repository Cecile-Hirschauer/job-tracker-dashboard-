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
  Sparkles,
  TrendingUp,
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
  APPLIED: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 shadow-sm",
  REVIEWING: "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-700 dark:text-yellow-300 border border-yellow-500/20 shadow-sm",
  PHONE_SCREEN: "bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 shadow-sm",
  TECHNICAL_TEST: "bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20 shadow-sm",
  INTERVIEW: "bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 shadow-sm",
  FINAL_INTERVIEW: "bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/20 shadow-sm",
  OFFER: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border border-green-500/20 shadow-sm",
  REJECTED: "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-700 dark:text-red-300 border border-red-500/20 shadow-sm",
  WITHDRAWN: "bg-gradient-to-r from-gray-500/10 to-slate-500/10 text-gray-700 dark:text-gray-300 border border-gray-500/20 shadow-sm",
};

const priorityColors = {
  LOW: "bg-gradient-to-r from-gray-400/10 to-slate-400/10 text-gray-600 dark:text-gray-400 border border-gray-400/20",
  MEDIUM: "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20",
  HIGH: "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-700 dark:text-red-300 border border-red-500/20 shadow-sm shadow-red-500/10",
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

export function ApplicationCard({ application, onEdit }: ApplicationCardProps) {
  const isHighPriority = application.priority === 'HIGH';
  const isOffer = application.status === 'OFFER';
  
  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98] ${
      isHighPriority ? 'ring-1 ring-red-500/20 shadow-lg shadow-red-500/5' : ''
    } ${
      isOffer ? 'ring-1 ring-green-500/30 shadow-lg shadow-green-500/10' : ''
    }`}>
      {/* Gradient overlay for special status */}
      {(isHighPriority || isOffer) && (
        <div className={`absolute inset-0 opacity-5 ${
          isHighPriority ? 'bg-gradient-to-br from-red-500 via-pink-500 to-rose-500' : 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500'
        }`} />
      )}
      
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-white/60 dark:from-slate-800/60 dark:via-slate-800/30 dark:to-slate-800/60 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-white/50 dark:ring-slate-600/50 shadow-lg">
                  <AvatarImage 
                    src={application.company.logo} 
                    alt={application.company.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold">
                    <Building2 className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                {isOffer && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 flex items-center justify-center animate-pulse">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {application.title}
                  </h3>
                  {isHighPriority && (
                    <TrendingUp className="h-4 w-4 text-red-500 animate-pulse" />
                  )}
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {application.company.name}
                </p>
                {application.company.industry && (
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {application.company.industry}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className={`${priorityColors[application.priority]} font-medium px-2 py-1 text-xs animate-in slide-in-from-right-1 duration-300`}>
                {application.priority}
              </Badge>
              <Badge className={`${statusColors[application.status]} font-medium px-2 py-1 text-xs animate-in slide-in-from-right-2 duration-300`}>
                {statusLabels[application.status]}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-5">
          {/* Description */}
          {application.description && (
            <div className="p-3 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/20">
              <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {application.description}
              </p>
            </div>
          )}

          {/* Job details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {application.location && (
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-700/40 transition-colors duration-200">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{application.location}</span>
              </div>
            )}
            {application.salary && (
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-700/40 transition-colors duration-200">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{application.salary.toLocaleString()}€</span>
              </div>
            )}
            {application.jobType && (
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-700/40 transition-colors duration-200">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{jobTypeLabels[application.jobType]}</span>
              </div>
            )}
          </div>

          {/* Contact info */}
          {application.contact && (
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-white/30 dark:from-slate-800/40 dark:to-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/20">
              <Avatar className="h-8 w-8 ring-2 ring-indigo-500/20">
                <AvatarFallback className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-xs font-semibold">
                  {application.contact.firstName[0]}{application.contact.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {application.contact.firstName} {application.contact.lastName}
                  </span>
                  {application.contact.position && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                      {application.contact.position}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="flex flex-wrap gap-3">
            {application.appliedAt && (
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <Calendar className="h-4 w-4 text-blue-500" />
                <div className="text-xs">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">Candidature</span>
                  <p className="text-blue-600 dark:text-blue-400">{format(new Date(application.appliedAt), "dd MMM yyyy", { locale: fr })}</p>
                </div>
              </div>
            )}
            {application.interviewAt && (
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-50/50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
                <Calendar className="h-4 w-4 text-purple-500" />
                <div className="text-xs">
                  <span className="text-purple-700 dark:text-purple-300 font-medium">Entretien</span>
                  <p className="text-purple-600 dark:text-purple-400">{format(new Date(application.interviewAt), "dd MMM yyyy", { locale: fr })}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-2">
              {application.contact?.email && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="hover:bg-white/60 dark:hover:bg-slate-700/60 hover:scale-105 transition-all duration-200"
                >
                  <a href={`mailto:${application.contact.email}`} title="Envoyer un email">
                    <Mail className="h-4 w-4 text-indigo-500" />
                  </a>
                </Button>
              )}
              {application.contact?.phone && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="hover:bg-white/60 dark:hover:bg-slate-700/60 hover:scale-105 transition-all duration-200"
                >
                  <a href={`tel:${application.contact.phone}`} title="Appeler">
                    <Phone className="h-4 w-4 text-green-500" />
                  </a>
                </Button>
              )}
              {application.jobUrl && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="hover:bg-white/60 dark:hover:bg-slate-700/60 hover:scale-105 transition-all duration-200"
                >
                  <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" title="Voir l'offre">
                    <ExternalLink className="h-4 w-4 text-blue-500" />
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
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-700/80 border-white/40 dark:border-slate-600/40 hover:scale-105 transition-all duration-200 font-medium"
                >
                  Modifier
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}