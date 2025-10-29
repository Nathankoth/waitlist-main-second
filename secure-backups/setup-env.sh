#!/bin/bash

# VistaForge Waitlist Environment Setup Script
# Run this script after you have your new Supabase project credentials

echo "🔧 Setting up new Supabase environment variables for VistaForge Waitlist"
echo ""

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

echo "📋 You'll need to provide:"
echo "   1. New Supabase Project URL"
echo "   2. New Supabase Anon Key"
echo "   3. New Supabase Service Role Key"
echo ""

read -p "Press Enter when you have your credentials ready..."

echo ""
echo "🚀 Setting up environment variables..."

# Set VITE_SUPABASE_URL
echo "Setting VITE_SUPABASE_URL..."
vercel env add VITE_SUPABASE_URL production

# Set VITE_SUPABASE_ANON_KEY  
echo "Setting VITE_SUPABASE_ANON_KEY..."
vercel env add VITE_SUPABASE_ANON_KEY production

# Set SUPABASE_SERVICE_ROLE_KEY
echo "Setting SUPABASE_SERVICE_ROLE_KEY..."
vercel env add SUPABASE_SERVICE_ROLE_KEY production

echo ""
echo "✅ Environment variables set successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Deploy the database schema using new-waitlist-schema.sql"
echo "   2. Deploy to production: vercel --prod"
echo "   3. Test the waitlist form"
echo ""
echo "🔍 To verify your environment variables:"
echo "   vercel env ls"
