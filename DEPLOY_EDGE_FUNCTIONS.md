# Deploy Supabase Edge Functions

## Current Setup ✅

You've correctly set up:
- ✅ Supabase CLI installed (`npx supabase`)
- ✅ Project linked (`npx supabase link`)
- ✅ Edge Functions created in `supabase/functions/` folder:
  - `functions/submit-application/index.ts`
  - `functions/submit-contact-message/index.ts`
  - `functions/upload-resume/index.ts`

**Important:** Functions must be in `supabase/functions/` directory, not directly in `supabase/`!

## About Linter Errors

The TypeScript linter errors you see are **expected and normal** for Deno Edge Functions:

- ❌ `Cannot find module 'https://deno.land/...'` - Deno uses URL imports
- ❌ `Cannot find name 'Deno'` - Deno has a global `Deno` object
- ❌ `Parameter 'req' implicitly has an 'any' type` - Deno types not loaded

**These errors won't affect deployment or functionality.** The code is correct for Deno.

## Deploy Edge Functions

### Option 1: Deploy All Functions at Once

```bash
# From website folder
npx supabase functions deploy submit-application
npx supabase functions deploy submit-contact-message
npx supabase functions deploy upload-resume
```

### Option 2: Deploy Using Supabase Dashboard

1. Go to https://app.supabase.com/ → Your Project
2. Navigate to **Edge Functions**
3. Click **Create a new function**
4. For each function:
   - Function name: `submit-application` (or `submit-contact-message`, `upload-resume`)
   - Copy the code from `supabase/[function-name]/index.ts`
   - Paste and deploy

## Environment Variables

Edge Functions automatically have access to:
- `SUPABASE_URL` - Your project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key

These are set automatically by Supabase, so you don't need to configure them manually.

## Verify Deployment

After deploying, test the functions:

```bash
# Test submit-application
curl -X POST https://wxuyyxqohjtcorzmmuay.supabase.co/functions/v1/submit-application \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","whatsapp":"+123","specialization":"CS","cgpa":8.5,"college":"Test","year_of_grad":"2025","backlogs":"Nil","resume_url":"https://test.com/resume.pdf"}'

# Test submit-contact-message
curl -X POST https://wxuyyxqohjtcorzmmuay.supabase.co/functions/v1/submit-contact-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
```

## Troubleshooting

### If deployment fails:
1. Make sure you're logged in: `npx supabase login`
2. Verify project link: `npx supabase projects list`
3. Check function code syntax (should be valid Deno/TypeScript)

### If functions return errors:
1. Check Supabase Dashboard → Edge Functions → Logs
2. Verify database tables exist (`applications`, `contact_messages`)
3. Verify storage bucket `resumes` exists

## Next Steps

1. ✅ Deploy all 3 functions
2. ✅ Test each function with curl or Postman
3. ✅ Test your Next.js API routes (they call these functions)
4. ✅ Verify data appears in Supabase tables

## Summary

Your setup is **correct**! The linter errors are just TypeScript not understanding Deno syntax - this is normal and won't affect functionality. Just deploy the functions and they'll work.
