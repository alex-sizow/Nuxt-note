export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return;


  const { $verifyJwtToken } = useNuxtApp() as unknown as {
    $verifyJwtToken: (token: string, secret?: string) => Promise<unknown>;
  };

  const jwt = useCookie('AlexNoteJWT')

  if (!jwt.value) {
    return navigateTo('/register')
  }

  try {
    await $verifyJwtToken(jwt.value, process.env.JWT_SECRET);

  } catch (error) {
    console.error('JWT verification failed:', error);
    navigateTo('/register');
  }
})
