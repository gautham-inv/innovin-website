// @ts-ignore - Deno URL imports are valid in Deno runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore - Deno URL imports are valid in Deno runtime
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { job_id, job_title, name, email, whatsapp, specialization, cgpa, college, year_of_grad, backlogs, resume_url } = await req.json()

    // Validate required fields
    if (!name || !email || !whatsapp || !specialization || !cgpa || !college || !year_of_grad || !backlogs || !resume_url) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role key
    // @ts-ignore - Deno global is available in Deno runtime
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    // @ts-ignore - Deno global is available in Deno runtime
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration:', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseServiceKey 
      })
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Supabase credentials' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Generate UUID for the application
    // Using crypto.randomUUID() which is available in Deno
    const applicationId = crypto.randomUUID()

    // Insert into applications table
    const { data, error } = await supabaseClient
      .from('applications')
      .insert({
        id: applicationId,
        job_id: job_id || null,
        job_title: job_title || null,
        name,
        email,
        whatsapp,
        specialization,
        cgpa: parseFloat(cgpa),
        college,
        year_of_grad,
        backlogs,
        resume_url,
        is_read: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting application:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save application',
          details: error.message,
          code: error.code,
          hint: error.hint
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: errorMessage
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

