export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()
  
    // redirect the user to the login page
    onMounted(() => {
        setTimeout(()=>{
            if (!user) {
                alert('You need to login first');
                return navigateTo({
                  path: '/',
                  query: {
                    redirect: to.fullPath,
                  },
                })
              }
        }, 1000);
    });
    
  })