-- SQL Schema setup for DigiScale Infotech Supabase Database

-- 1. Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(150) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create project_inquiries table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(150) NOT NULL,
    requirement VARCHAR(100) NOT NULL,
    project_details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) or public insert if needed
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public read/write or insert access policies as desired (or bypass with service_role key)
CREATE POLICY "Allow public insert for newsletter_subscribers" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for project_inquiries" ON public.project_inquiries FOR INSERT WITH CHECK (true);

-- Allow service_role / authenticated read access
CREATE POLICY "Allow authenticated read for newsletter_subscribers" ON public.newsletter_subscribers FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read for contact_messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read for project_inquiries" ON public.project_inquiries FOR SELECT USING (true);
