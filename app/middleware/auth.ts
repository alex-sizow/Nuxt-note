export default defineNuxtRouteMiddleware((to) => {
  console.log('middleware triggered FIRE')

  const jwt = useCookie('AlexNoteJWT')

  if (!jwt.value) {
    return navigateTo('/register')
  }
})
