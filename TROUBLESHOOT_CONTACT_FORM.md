# Troubleshooting Contact Form Submission Error

## Error Analysis

The contact form is returning a 500 error with message "Failed to save message". 

## Possible Causes

1. **Edge Function Not Deployed**
   - The Edge Function `submit-contact-message` might not be deployed to Supabase
   - Check: Run `npx supabase functions list` to see deployed functions

2. **Missing Environment Variables**
   - Edge Function needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
   - Set these in Supabase Dashboard → Project Settings → Edge Functions → Secrets

3. **Database Table Issues**
   - `contact_messages` table might not exist
   - Table schema might be incorrect
   - Check: Verify table exists with correct columns

4. **Database Permissions**
   - Service role key might not have INSERT permissions
   - Check: Verify RLS policies allow service role to insert

## How to Debug

1. **Check Edge Function Logs**:
   ```bash
   npx supabase functions logs submit-contact-message --limit 20
   ```

2. **Check Server Console**:
   - Look for "Edge Function error response" in Next.js server logs
   - Check for "Error inserting message" in Edge Function logs

3. **Verify Database Schema**:
   ```sql
   SELECT column_name, data_type, is_nullable
   FROM information_schema.columns
   WHERE table_name = 'contact_messages';
   ```

4. **Test Edge Function Directly**:
   ```bash
   curl -X POST https://<project>.supabase.co/functions/v1/submit-contact-message \
     -H "Authorization: Bearer <anon-key>" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## Expected Database Schema

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);
```

## Next Steps

1. Deploy the Edge Function if not deployed
2. Set environment variables in Supabase Dashboard
3. Verify database table exists with correct schema
4. Check Edge Function logs for specific error messages

