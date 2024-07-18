import { createClient } from '@supabase/supabase-js';

const URL = 'https://tsevnltyhpuzczdvnnnd.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZXZubHR5aHB1emN6ZHZubm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNTU1MjYsImV4cCI6MjAzNDgzMTUyNn0.jAZpWNt7jW7qWd76eaS12iKK9-82DTViIf00BTKrg1Q';

const supabase = createClient(URL, API_KEY);

export default supabase;