// @ts-ignore - Deno URL imports are valid in Deno runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore - Deno URL imports are valid in Deno runtime
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fileName, fileType, fileData } = await req.json()

    if (!fileName || !fileType) {
      return new Response(
        JSON.stringify({ error: 'Missing fileName or fileType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Supabase configuration
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

    // Generate unique file path
    const timestamp = Date.now()
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    // Store files in 'resumes' folder within the 'resumes' bucket
    const filePath = `resumes/${timestamp}-${sanitizedFileName}`

    if (fileData) {
      // Upload file from base64 data
      const fileBuffer = Uint8Array.from(atob(fileData), c => c.charCodeAt(0))
      
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('resumes')
        .upload(filePath, fileBuffer, {
          contentType: fileType,
          upsert: false,
        })

      if (uploadError) {
        console.error('Error uploading file:', uploadError)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to upload file',
            details: uploadError.message,
            code: uploadError.statusCode
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Get public URL
      const { data: urlData } = supabaseClient.storage
        .from('resumes')
        .getPublicUrl(filePath)

      return new Response(
        JSON.stringify({
          filePath: filePath,
          resumeUrl: urlData.publicUrl,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      // Create presigned URL for client-side upload
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('resumes')
        .createSignedUploadUrl(filePath, {
          upsert: false,
        })

      if (uploadError || !uploadData) {
        console.error('Error creating presigned URL:', uploadError)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to create upload URL',
            details: uploadError?.message || 'Unknown error',
            code: uploadError?.statusCode
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({
          uploadUrl: uploadData.signedUrl,
          filePath: filePath,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
