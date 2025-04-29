const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send('No token provided');

  const token = authHeader.split(' ')[1];

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return res.status(401).send('Invalid token');
  }

  req.user = user; // Save user into request object
  next();
}

module.exports = authenticateUser;
