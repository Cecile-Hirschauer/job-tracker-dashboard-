#!/bin/bash
# Script helper pour exécuter les commandes Prisma avec les bonnes variables d'environnement

# Variables d'environnement pour le développement local
export DATABASE_URL="postgresql://postgres:password123@localhost:5432/jobtracker"
export DIRECT_URL="postgresql://postgres:password123@localhost:5432/jobtracker"

# Exécuter la commande passée en paramètre
"$@"