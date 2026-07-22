#!/bin/bash
# Script para iniciar el servidor local

echo "🏠 Iniciando Casa Rural El Encinal..."
echo ""
echo "📍 El sitio estará disponible en: http://localhost:8000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

npx http-server -p 8000 -o
